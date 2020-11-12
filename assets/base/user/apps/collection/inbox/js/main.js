/*
 * Inbox javascript file
*/

jQuery(document).ready( function ($) {
    'use strict';
    
    /*
     * Get the website's url
     */
    var url =  $('meta[name=url]').attr('content');
    
    /*******************************
    METHODS
    ********************************/
    
    /*
     * Load available networks
     * 
     * @since   0.0.7.4
     */
    Main.account_manager_load_networks = function () {
        
        var data = {
            action: 'account_manager_load_networks'
        };
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'account_manager_load_networks');
        
    };
    
    /*
     * Load network's accounts
     * 
     * @since   0.0.7.4
     * 
     * @param string type contains the tab name
     * 
     * @param string network contains the network's name
     */
    Main.account_manager_get_accounts = function (network, type) {
        
        var data = {
            action: 'account_manager_get_accounts',
            network: network,
            type: type
        };
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'account_manager_get_accounts');
        
    };
    
    /*
     * Reload accounts
     * 
     * @since   0.0.7.4
     */
    Main.reload_accounts = function () {
        
        $('.main .accounts-manager-search-for-accounts').keyup();
        $('.main .cancel-accounts-manager-search').hide();
        
    }; 
    
    /*******************************
    RESPONSES
    ********************************/
    
    /*
     * Display social networks
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.account_manager_load_networks = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {
            
            $( '#nav-accounts-manager' ).html( data.social_data );
            
            if ( $( '#nav-groups-manager' ).length > 0 ) {
                
                $( '#nav-groups-manager' ).html( data.groups_data );
            
            }
            
        }
        
    };
    
    /*
     * Display network's accounts
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.account_manager_get_accounts = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {
            
            if ( data.type === 'accounts_manager' ) {
                
                // Verify if hidden content exists
                if ( data.hidden ) {
                    $( '.main .manage-accounts-hidden-content' ).html(data.hidden);
                } else {
                    $( '.main .manage-accounts-hidden-content' ).empty();
                }
                
                $( '.main .manage-accounts-hidden-content' ).fadeOut('fast');
            
                // Display accounts
                $( '#accounts-manager-popup .manage-accounts-all-accounts' ).html(data.active);

                // Display network's instructions
                $( '#accounts-manager-popup .manage-accounts-network-instructions' ).html(data.instructions);

                // Display search form
                $( '#accounts-manager-popup .manage-accounts-search-form' ).html(data.search_form);
            
            } else {
                
                // Display accounts
                $( '#accounts-manager-popup .manage-accounts-groups-all-accounts' ).html(data.active);

                if ( $('.accounts-manager-groups-select-group .btn-secondary').attr('data-id') ) {
                    
                    // Remove selected accounts
                    $( '.main #nav-groups-manager .accounts-manager-groups-active-accounts li' ).removeClass( 'select-account-in-group' );
                    
                    var group_accounts = $('main .create-new-group-form .accounts-manager-groups-available-accounts li');

                    for ( var g = 0; g < group_accounts.length; g++ ) {
                        
                        $( '.main #nav-groups-manager .accounts-manager-groups-active-accounts li a[data-id="' + group_accounts.eq(g).find('a').attr('data-id') + '"]' ).closest( 'li' ).addClass( 'select-account-in-group' );
                        
                    }
                    
                }
                
            }
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*
     * Display social networks
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.account_manager_load_networks = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {
            
            $( '#nav-accounts-manager' ).html( data.social_data );
            
            if ( $( '#nav-groups-manager' ).length > 0 ) {
                
                $( '#nav-groups-manager' ).html( data.groups_data );
            
            }
            
        }
        
    };
    
    /*
     * Display search results in accounts manager
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.account_manager_search_for_accounts = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {
            
            if ( data.type === 'accounts_manager' ) {

                $( document ).find( '#nav-accounts-manager .manage-accounts-all-accounts' ).html( data.social_data );
                
            } else {
                
                $( document ).find( '#nav-groups-manager .manage-accounts-groups-all-accounts' ).html( data.social_data );
                
            }
            
        } else {
            
            if ( $('#nav-accounts-manager').hasClass('show') ) {
                
                $( document ).find('#nav-accounts-manager .manage-accounts-all-accounts').html( data.message );
                
            } else {
                
                $( document ).find( '#nav-groups-manager .manage-accounts-groups-all-accounts' ).html( data.social_data );
                
            }         
            
        }
        
        if ( $('.accounts-manager-groups-select-group .btn-secondary').attr('data-id') ) {

            // Remove selected accounts
            $( '.main #nav-groups-manager .accounts-manager-groups-active-accounts li' ).removeClass( 'select-account-in-group' );

            var group_accounts = $('main .create-new-group-form .accounts-manager-groups-available-accounts li');

            for ( var g = 0; g < group_accounts.length; g++ ) {

                $( '.main #nav-groups-manager .accounts-manager-groups-active-accounts li a[data-id="' + group_accounts.eq(g).find('a').attr('data-id') + '"]' ).closest( 'li' ).addClass( 'select-account-in-group' );

            }

        }
        
    }; 
    
    /*
     * Display account deletion status
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.account_manager_delete_accounts = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {
            
            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);

            // Remove account from the list
            $('#nav-accounts-manager .accounts-manager-active-accounts-list li a[data-id="' + data.account_id + '"]').closest('li').remove();
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*
     * Display search results in accounts manager
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.account_manager_search_for_accounts = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {

            $( document ).find( '#nav-accounts-manager .manage-accounts-all-accounts' ).html( data.social_data );
            
        } else {
            
            if ( $('#nav-accounts-manager').hasClass('show') ) {
                
                $( document ).find('#nav-accounts-manager .manage-accounts-all-accounts').html( data.message );
                
            } else {
                
                $( document ).find( '#nav-groups-manager .manage-accounts-groups-all-accounts' ).html( data.social_data );
                
            }         
            
        }
        
    }; 
    
    /*******************************
    ACTIONS
    ********************************/
   
    /*
     * Search for accounts in the accounts manager popup
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $( document ).on( 'keyup', 'main .accounts-manager-search-for-accounts', function (e) {
        e.preventDefault();
            
        // Get network
        var network = $('#nav-accounts-manager').find('.network-selected a').attr('data-network');

        // Get search keys
        var key = $('#nav-accounts-manager').find('.accounts-manager-search-for-accounts').val();

        // Display cancel search icon
        $(this).closest( '.row' ).find( '.cancel-accounts-manager-search' ).fadeIn( 'slow' );

        var data = {
            action: 'account_manager_search_for_accounts',
            network: network,
            key: key,
            type: 'accounts_manager'
        };

        // Set CSRF
        data[$('.facebook-pages-private-message-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-private-message-save').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'account_manager_search_for_accounts');
        
    });
    
    /*
     * Load available networks
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page .inbox-connect-new-account', function(e) {
        e.preventDefault();
        
        if ( $('.accounts-manager-search').length < 1 ) {
        
            Main.account_manager_load_networks();

            // Display loading animation
            $('.page-loading').fadeIn('slow');
        
        }
        
    });
    
    /*
     * Load accounts by network
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $( document ).on( 'click', '.main .accounts-manager-available-networks li a', function (e) {
        e.preventDefault();
        
        var network = $(this).attr('data-network');
        
        if ( $('#nav-accounts-manager').hasClass('show') ) {
        
            $('.manage-accounts-all-accounts').empty();

            $('#nav-accounts-manager .accounts-manager-available-networks li').removeClass('network-selected');

            $(this).closest('li').addClass('network-selected');

            Main.account_manager_get_accounts(network, 'accounts_manager');
        
        } else {
            
            $( '.manage-accounts-groups-all-accounts' ).empty();
            
            $('#nav-groups-manager .accounts-manager-available-networks li').removeClass('network-selected');
            
            $(this).closest('li').addClass('network-selected');
            
            Main.account_manager_get_accounts(network, 'groups_manager');
            
        }
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Connect a new account
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .manage-accounts-new-account', function() {
        
        // Verify if should be displayed hidden content
        if ( $( this ).hasClass('manage-accounts-display-hidden-content') ) {
            $( '.main .manage-accounts-hidden-content' ).fadeIn('slow');
        } 
        
        // Get network
        var network = $('#nav-accounts-manager').find('.network-selected a').attr('data-network');
        
        var popup_url = url + 'user/connect/' + network;
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - ((width/2) / 2)) + dualScreenLeft;
        var top = ((height / 1.3) - ((height/1.3) / 1.3)) + dualScreenTop;
        var networkWindow = window.open(popup_url, 'Connect Account', 'scrollbars=yes, width=' + (width/2) + ', height=' + (height/1.3) + ', top=' + top + ', left=' + left);

        if (window.focus) {
            networkWindow.focus();
        }
        
    });
    
    /*
     * Cancel accounts manager search
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.2
     */ 
    $( document ).on( 'click', '.main .cancel-accounts-manager-search', function (e) {
        e.preventDefault();
            
        // Hide cancel search button
        $(this).closest('.tab-pane').find('.cancel-accounts-manager-search').fadeOut('slow');
        
        // Get network
        var network = $('#nav-accounts-manager').find('.network-selected a').attr('data-network');

        // Empty the search input
        $('#nav-accounts-manager').find('.accounts-manager-search-for-accounts').val('');

        var data = {
            action: 'account_manager_search_for_accounts',
            network: network,
            key: '',
            type: 'accounts_manager'
        };

        // Set CSRF
        data[$('.facebook-pages-private-message-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-private-message-save').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'account_manager_search_for_accounts');
        
    });
    
    /*
     * Delete accounts from the accounts manager popup
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $( document ).on( 'click', '.main .accounts-manager-active-accounts-list li a', function (e) {
        e.preventDefault();
            
        // Get the account's id
        var account_id = $(this).attr('data-id');

        var data = {
            action: 'account_manager_delete_accounts',
            account_id: account_id
        };

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'account_manager_delete_accounts');
        
    });
    
    /*
     * Detect when accounts manager is closed
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */
    $('#accounts-manager-popup').on('hidden.bs.modal', function (e) {
        
        $('.main .inbox-search-for-accounts').keyup();
        $('.main .inbox-cancel-search-for-accounts').hide();
        
    });
    
});