<?php
/**
 * Google
 *
 * PHP Version 5.6
 *
 * Connect and and sign up with Google
 *
 * @category Social
 * @package  Midrub
 * @author   Scrisoft <asksyn@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License
 * @link     https://www.midrub.com/
 */

 // Define the file namespace
namespace MidrubBase\Auth\Social;

defined('BASEPATH') OR exit('No direct script access allowed');

// Define the namespaces to use
use MidrubBase\Auth\Interfaces as MidrubBaseAuthInterfaces;

/**
 * Google class - connect and sign up with Google
 *
 * @category Social
 * @package  Midrub
 * @author   Scrisoft <asksyn@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License
 * @link     https://www.midrub.com/
 */
class Google implements MidrubBaseAuthInterfaces\Social {

    /**
     * Class variables
     */
    public $CI, $client, $client_id, $client_secret, $api_url, $api_key, $app_name;

    /**
     * Initialize the class
     */
    public function __construct() {
        
        // Get the CodeIgniter super object
        $this->CI = & get_instance();

        // Get the Google's client_id
        $this->client_id = get_option('google_auth_client_id');
        
        // Get the Google's client_secret
        $this->client_secret = get_option('google_auth_client_secret');
        
        // Get the Google's api key
        $this->api_key = get_option('google_auth_api_key');
        
        // Get the Google's application name
        $this->app_name = get_option('google_auth_application_name');
        
        // Require the  vendor's libraries
        require_once FCPATH . 'vendor/autoload.php';
        
    }

    /**
     * The public method check_availability verifies if social class is configured
     *
     * @return boolean true or false
     */
    public function check_availability() {
        
        if ( ($this->client_id != '') AND ( $this->client_secret != '') AND ( $this->api_key != '') ) {
            
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

        // Call the class Google_Client
        $this->client = new \Google_Client();
        
        // Name of the google application
        $this->client->setApplicationName($this->app_name);
        
        // Set the client_id
        $this->client->setClientId($this->client_id);
        
        // Set the client_secret
        $this->client->setClientSecret($this->client_secret);
        
        // Redirects to same url
        $this->client->setRedirectUri($redirect_url);
        
        // Set the api key
        $this->client->setDeveloperKey($this->api_key);
        
        // Load required scopes
        $this->client->setScopes( array(
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
        ) );
        
        // Generate redirect url
        $authUrl = $this->client->createAuthUrl();
        
        // Redirect
        header('Location:' . $authUrl);
        
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

            // Call the class Google_Client
            $this->client = new \Google_Client();

            // Name of the google application
            $this->client->setApplicationName($this->app_name);

            // Set the client_id
            $this->client->setClientId($this->client_id);

            // Set the client_secret
            $this->client->setClientSecret($this->client_secret);

            // Redirects to same url
            $this->client->setRedirectUri($redirect_url);

            // Set the api key
            $this->client->setDeveloperKey($this->api_key);
            
            // Send the received code
            $this->client->authenticate( $this->CI->input->get('code', TRUE) );
            
            // Get access token
            $response = $this->client->getAccessToken();
            
            // Set access token
            $this->client->setAccessToken($response);

            // Verify if access token exists
            if (isset($response['access_token'])) {
                
                // Get user information
                $user_data = json_decode(get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' . $response['access_token']), true);

                // Verify if user data exists
                if (isset($user_data['id'])) {

                    // Load the Base Users Model
                    $this->CI->load->ext_model(MIDRUB_BASE_PATH . 'models/', 'Base_users', 'base_users');

                    // Load the bcrypt library
                    $this->CI->load->library('bcrypt');

                    // Create $user_args array
                    $user_args = array();

                    // Set the user name
                    $user_args['username'] = 'g.' . $user_data['id'];

                    // Set default email address
                    $email_address = $user_data['id'] . '@google.com';

                    // Verify if email exists
                    if (isset($user_data['email'])) {
                        $email_address = $user_data['email'];
                    }

                    // Set the email
                    $user_args['email'] = $email_address;

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
                    $user_args['first_name'] = $user_data['name'];

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
                        $this->CI->session->set_userdata('username', 'g.' . $user_data['id']);

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

            // Call the class Google_Client
            $this->client = new \Google_Client();

            // Name of the google application
            $this->client->setApplicationName($this->app_name);

            // Set the client_id
            $this->client->setClientId($this->client_id);

            // Set the client_secret
            $this->client->setClientSecret($this->client_secret);

            // Redirects to same url
            $this->client->setRedirectUri($redirect_url);

            // Set the api key
            $this->client->setDeveloperKey($this->api_key);

            // Send the received code
            $this->client->authenticate($this->CI->input->get('code', TRUE));

            // Get access token
            $response = $this->client->getAccessToken();

            // Set access token
            $this->client->setAccessToken($response);

            // Verify if access token exists
            if (isset($response['access_token'])) {

                // Get user information
                $user_data = json_decode(get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' . $response['access_token']), true);

                // Verify if user data exists
                if (isset($user_data['id'])) {

                    // Get user from database by Facebook id
                    $get_user = $this->CI->base_model->get_data_where('users', 'username', array('username' => 'g.' . $user_data['id']));

                    // Verify if user exists
                    if ($get_user) {

                        // Register session
                        $this->CI->session->set_userdata('username', 'g.' . $user_data['id']);

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
            'color' => '#4285f4',
            'icon' => '<i class="google-icon" style="background-image: url(../assets/img/g-logo.png); width: 20px; height: 20px; display: inline-block;"></i>',
            'api' => array(
                'client_id',
                'client_secret',
                'api_key',
                'application_name'
            )
        );
        
    }

}
