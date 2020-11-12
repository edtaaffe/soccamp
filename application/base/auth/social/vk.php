<?php
/**
 * VK
 *
 * PHP Version 5.6
 *
 * Connect and and sign up with VK
 *
 * @category Social
 * @package  Midrub
 * @author   Scrisoft <asksyn@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License
 * @link     https://www.midrub.com/
 */

 // Define the file namespace
namespace MidrubBase\Auth\Social;

// Constants
defined('BASEPATH') OR exit('No direct script access allowed');

// Define the namespaces to use
use MidrubBase\Auth\Interfaces as MidrubBaseAuthInterfaces;

/**
 * VK class - connect and sign up with VK
 *
 * @category Social
 * @package  Midrub
 * @author   Scrisoft <asksyn@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License
 * @link     https://www.midrub.com/
 */
class Vk implements MidrubBaseAuthInterfaces\Social {

    /**
     * Class variables
     */
    public $CI, $client_id, $client_secret, $api_url, $version;

    /**
     * Initialize the class
     */
    public function __construct() {
        
        // Get the CodeIgniter super object
        $this->CI = & get_instance();
        
        // Get the Vk Client ID
        $this->client_id = get_option('vk_auth_client_id');
        
        // Get the Vk Client Secret
        $this->client_secret = get_option('vk_auth_client_secret');

        // Set api's url
        $this->api_url = 'http://oauth.vk.com/';

        // Set apițs version
        $this->version = '5.92';
        
    }

    /**
     * The public method check_availability verifies if social class is configured
     *
     * @return boolean true or false
     */
    public function check_availability() {
        
        if ( ($this->client_id != '') AND ( $this->client_secret != '') ) {
            
            return true;
            
        } else {
            
            return false;
            
        }
        
    }

    /**
     * The public method connect redirects user to social network where should approve permissions
     * 
     * @param string $redirect_url contains the redirect's url
     * 
     * @since 0.0.7.8
     * 
     * @return void
     */
    public function connect($redirect_url=NULL) {

        // Params for request
        $params = array(
            'client_id' => $this->client_id,
            'scope' => 'wall',
            'redirect_uri' => $redirect_url,
            'response_type' => 'code'
        );

        // Get redirect url
        $loginUrl = $this->api_url . 'authorize/?' . urldecode(http_build_query($params));

        // Redirect
        header('Location:' . $loginUrl);
        
    }

    /**
     * The public method save gets the access token and saves it
     * 
     * @param string $redirect_url contains the redirect's url
     * 
     * @return array with response
     */ 
    public function save($redirect_url=NULL) {

        // Verify if code exists
        if ($this->CI->input->get('code', TRUE)) {

            // Prepare data to request access token
            $params = array(
                'client_id' => $this->client_id,
                'client_secret' => $this->client_secret,
                'redirect_uri' => $redirect_url,
                'code' => $this->CI->input->get('code', TRUE)
            );

            // Get cURL resource
            $curl = curl_init();

            // Set some options - we are passing in a useragent too here
            curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => 'https://oauth.vk.com/access_token' . '?' . urldecode(http_build_query($params)), CURLOPT_HEADER => false));

            // Send the request & save response to $resp
            $resp = curl_exec($curl);

            // Close request to clear up some resources
            curl_close($curl);

            // Decode response
            $response = json_decode($resp, true);

            // Verify if access token exists
            if (isset($response['access_token'])) {

                // Permissions
                $params = array(
                    'fields' => 'uid,screen_name,photo_big,wall',
                    'access_token' => $response['access_token'],
                    'v' => $this->version
                );

                // Get cURL resource
                $curl = curl_init();

                // Set some options - we are passing in a useragent too here
                curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => 'https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params)), CURLOPT_HEADER => false));

                // Send the request & save response to $resp
                $user = curl_exec($curl);

                // Close request to clear up some resources
                curl_close($curl);

                // Get user data
                $user_info = (array) json_decode($user);

                if ( isset($user_info['response']) ) {

                    // Load the Base Users Model
                    $this->CI->load->ext_model(MIDRUB_BASE_PATH . 'models/', 'Base_users', 'base_users');

                    // Load the bcrypt library
                    $this->CI->load->library('bcrypt');

                    // Create $user_args array
                    $user_args = array();

                    // Set the user name
                    $user_args['username'] = 'v.' . $user_info['response'][0]->id;

                    // Set the email
                    $user_args['email'] = $user_info['response'][0]->id . '@vk.com';

                    // Verify if email already exists
                    if ($this->CI->base_users->get_user_ceil('email', $user_args['email'])) {

                        return array(
                            'success' => FALSE,
                            'message' => $this->CI->lang->line('auth_email_was_found_in_the_database')
                        );
                    }

                    // Set the password
                    $user_args['password'] = $this->CI->bcrypt->hash_password(uniqid());

                    // Set first name
                    $user_args['first_name'] = $user_info['response'][0]->first_name;

                    // Set last name
                    $user_args['last_name'] = $user_info['response'][0]->last_name;

                    // Set the default status
                    $user_args['status'] = 1;

                    // Set date when user joined
                    $user_args['date_joined'] = date('Y-m-d H:i:s');

                    // Set user's ip
                    $user_args['ip_address'] = $this->CI->input->ip_address();

                    // Save the user
                    $user_id = $this->CI->base_model->insert('users', $user_args);

                    // Verify if user was saved successfully
                    if ($user_id) {

                        // Set default user's plan
                        $this->CI->plans->change_plan(1, $user_id);

                        // Verify if the user has a referrer
                        if ($this->CI->session->userdata('referrer')) {

                            // Get referrer
                            $referrer = base64_decode($this->CI->session->userdata('referrer'));

                            // Verify if referrer is valid
                            if (is_numeric($referrer)) {

                                // Load Referrals model
                                $this->CI->load->model('referrals');

                                // Save referral
                                $this->CI->referrals->save_referrals($referrer, $user_id, 1);

                                // Delete session
                                $this->CI->session->unset_userdata('referrer');
                            }
                        }

                        // Register session
                        $this->CI->session->set_userdata('username', 'v.' . $user_info['response'][0]->id);

                        return array(
                            'success' => TRUE
                        );

                    } else {

                        return array(
                            'success' => FALSE,
                            'message' => $this->CI->lang->line('auth_registtration_failed')
                        );
                    }

                } else {

                    return array(
                        'success' => FALSE,
                        'message' => $this->CI->lang->line('auth_registtration_failed')
                    );

                }

            } else {

                return array(
                    'success' => FALSE,
                    'message' => $this->CI->lang->line('auth_an_error_occurred')
                );

            }

        } else {

            return array(
                'success' => FALSE,
                'message' => $this->CI->lang->line('auth_an_error_occurred')
            );

        }
        
    }

    /**
     * The public method login uses the access token to verify if user is register already
     * 
     * @param string $redirect_url contains the redirect url
     * 
     * @since 0.0.7.8
     * 
     * @return array with response
     */
    public function login($redirect_url=NULL) {

        // Verify if code exists
        if ($this->CI->input->get('code', TRUE)) {

            // Prepare data to request access token
            $params = array(
                'client_id' => $this->client_id,
                'client_secret' => $this->client_secret,
                'redirect_uri' => $redirect_url,
                'code' => $this->CI->input->get('code', TRUE)
            );

            // Get cURL resource
            $curl = curl_init();

            // Set some options - we are passing in a useragent too here
            curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => 'https://oauth.vk.com/access_token' . '?' . urldecode(http_build_query($params)), CURLOPT_HEADER => false));

            // Send the request & save response to $resp
            $resp = curl_exec($curl);

            // Close request to clear up some resources
            curl_close($curl);

            // Decode response
            $response = json_decode($resp, true);

            // Verify if access token exists
            if (isset($response['access_token'])) {

                // Permissions
                $params = array(
                    'fields' => 'uid,screen_name,photo_big,wall',
                    'access_token' => $response['access_token'],
                    'v' => $this->version
                );

                // Get cURL resource
                $curl = curl_init();

                // Set some options - we are passing in a useragent too here
                curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => 'https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params)), CURLOPT_HEADER => false));

                // Send the request & save response to $resp
                $user = curl_exec($curl);

                // Close request to clear up some resources
                curl_close($curl);

                // Get user data
                $user_info = (array) json_decode($user);

                if ( isset($user_info['response']) ) {

                    // Get user from database by Facebook id
                    $get_user = $this->CI->base_model->get_data_where('users', 'username', array('username' => 'v.' . $user_info['response'][0]->id));

                    // Verify if user exists
                    if ($get_user) {

                        // Register session
                        $this->CI->session->set_userdata('username', 'v.' . $user_info['response'][0]['id']);

                        return array(
                            'success' => TRUE
                        );

                    } else {

                        return array(
                            'success' => FALSE,
                            'message' => $this->CI->lang->line('auth_no_account_found')
                        );

                    }

                } else {

                    return array(
                        'success' => FALSE,
                        'message' => $this->CI->lang->line('auth_no_account_found')
                    );
                    
                }

            }

        }

        return array(
            'success' => FALSE,
            'message' => $this->CI->lang->line('auth_an_error_occurred')
        );

    }

    /**
     * The public method get_info displays information about this class
     * 
     * @return object with network data
     */
    public function get_info() {

        return (object)array(
            'color' => '#6383a8',
            'icon' => '<i class="fab fa-vk"></i>',
            'api' => array('client_id', 'client_secret')
        );
        
    }

}
