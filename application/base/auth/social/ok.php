<?php
/**
 * OK
 *
 * PHP Version 5.6
 *
 * Connect and and sign up with OK
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
 * Ok class - connect and sign up with OK
 *
 * @category Social
 * @package  Midrub
 * @author   Scrisoft <asksyn@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License
 * @link     https://www.midrub.com/
 */
class Ok implements MidrubBaseAuthInterfaces\Social {

    /**
     * Class variables
     */
    public $CI,
        $app_id,
        $public_key,
        $secret_key,
        $api_url,
        $version;

    /**
     * Initialize the class
     */
    public function __construct() {
        
        // Get the CodeIgniter super object
        $this->CI = & get_instance();
        
        // Get OK's app_id
        $this->app_id = get_option('ok_auth_app_id');
        
        // Get OK's public_key
        $this->public_key = get_option('ok_auth_public_key');        
        
        // Get OK's secret_key
        $this->secret_key = get_option('ok_auth_secret_key');

        // Set api's url
        $this->api_url = 'https://api.ok.ru/fb.do';
        
    }

    /**
     * The public method check_availability verifies if social class is configured
     *
     * @return boolean true or false
     */
    public function check_availability() {
        
        if ( ($this->app_id != '') AND ( $this->public_key != '') AND ( $this->secret_key != '') ) {
            
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
            'client_id' => $this->app_id,
            'redirect_uri' => $redirect_url,
            'response_type' => 'code'
        );

        // Get redirect url
        $loginUrl = 'https://connect.ok.ru/oauth/authorize?' . urldecode(http_build_query($params));

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

            $params = array(
                'code' => $this->CI->input->get('code', TRUE),
                'redirect_uri' => $redirect_url,
                'grant_type' => 'authorization_code',
                'client_id' => $this->app_id,
                'client_secret' => $this->secret_key
            );
            
            $response = json_decode(post('https://api.ok.ru/oauth/token.do', $params), true);

            // Verify if access token exists
            if (isset($response['access_token'])) {

                // Create the signature
                $sign = md5("application_key={$this->public_key}format=jsonmethod=users.getCurrentUser" . md5("{$response['access_token']}{$this->secret_key}"));

                // Prepare data to send
                $params = array(
                    'method'          => 'users.getCurrentUser',
                    'access_token'    => $response['access_token'],
                    'application_key' => $this->public_key,
                    'format'          => 'json',
                    'sig'             => $sign
                );

                // Get user data
                $user_info = json_decode(get( $this->api_url . '?' . urldecode(http_build_query($params))), true);

                if ( isset($user_info['uid']) ) {

                    // Load the Base Users Model
                    $this->CI->load->ext_model(MIDRUB_BASE_PATH . 'models/', 'Base_users', 'base_users');

                    // Load the bcrypt library
                    $this->CI->load->library('bcrypt');

                    // Create $user_args array
                    $user_args = array();

                    // Set the user name
                    $user_args['username'] = 'o.' . $user_info['uid'];

                    // Set the email
                    $user_args['email'] = $user_info['uid'] . '@ok.ru';

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
                    $user_args['first_name'] = $user_info['first_name'];

                    // Set last name
                    $user_args['last_name'] = $user_info['last_name'];

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
                        $this->CI->session->set_userdata('username', 'o.' . $user_info['uid']);

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

            $params = array(
                'code' => $this->CI->input->get('code', TRUE),
                'redirect_uri' => $redirect_url,
                'grant_type' => 'authorization_code',
                'client_id' => $this->app_id,
                'client_secret' => $this->secret_key
            );
            
            $response = json_decode(post('https://api.ok.ru/oauth/token.do', $params), true);

            // Verify if access token exists
            if (isset($response['access_token'])) {

                // Create the signature
                $sign = md5("application_key={$this->public_key}format=jsonmethod=users.getCurrentUser" . md5("{$response['access_token']}{$this->secret_key}"));

                // Prepare data to send
                $params = array(
                    'method'          => 'users.getCurrentUser',
                    'access_token'    => $response['access_token'],
                    'application_key' => $this->public_key,
                    'format'          => 'json',
                    'sig'             => $sign
                );

                // Get user data
                $user_info = json_decode(get( $this->api_url . '?' . urldecode(http_build_query($params))), true);

                if ( isset($user_info['uid']) ) {

                    // Get user from database by Facebook id
                    $get_user = $this->CI->base_model->get_data_where('users', 'username', array('username' => 'o.' . $user_info['uid']));

                    // Verify if user exists
                    if ($get_user) {

                        // Register session
                        $this->CI->session->set_userdata('username', 'o.' . $user_info['uid']);

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
            'color' => '#ee8208',
            'icon' => '<i class="fab fa-odnoklassniki"></i>',
            'api' => array(
                'app_id',
                'public_key',
                'secret_key'
            )
        );
        
    }

}
