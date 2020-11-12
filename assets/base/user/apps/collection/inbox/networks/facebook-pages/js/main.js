/*
 * Inbox Facebook Pages network javascript file
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
     * Load Facebook Pages
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.7.4
     */
    Main.inbox_load_facebook_pages = function (page) {
        
        var data = {
            action: 'inbox_search_for_facebook_pages',
            network: 'facebook_pages',
            key: $( '.inbox-search-for-accounts' ).val(),
            page: page
        };
        
        // Set CSRF
        data[$('.facebook-pages-quick-replies-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-quick-replies-save').attr('data-csrf') + '"]').val();
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'inbox_search_for_facebook_pages');
        
    };
    
    /*
     * Load Quick Replies for Facebook Pages
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.7.4
     */
    Main.inbox_load_facebook_pages_quick_replies = function (page) {
        
        var data = {
            action: 'inbox_search_for_facebook_pages_quick_replies',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            key: $( '.quick-replies-for-replies' ).val(),
            page: page
        };
        
        // Set CSRF
        data[$('.facebook-pages-quick-replies-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-quick-replies-save').attr('data-csrf') + '"]').val();
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'inbox_search_for_facebook_pages_quick_replies');
        
    };
    
    /*
     * Load Private Messages for Facebook Pages
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.7.4
     */
    Main.inbox_load_facebook_pages_private_messages = function (page) {
        
        var data = {
            action: 'inbox_search_for_facebook_pages_private_messages',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            key: $( '.private-messages-search-for-messages' ).val(),
            page: page
        };
        
        // Set CSRF
        data[$('.facebook-pages-private-message-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-private-message-save').attr('data-csrf') + '"]').val();
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'inbox_search_for_facebook_pages_private_messages');
        
    };
    
    /*
     * Display analytics for Quick Replies
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.7.4
     */
    Main.inbox_load_facebook_pages_analytics_quick_replies = function (page) {
        
        var data = {
            action: 'inbox_load_facebook_pages_analytics_quick_replies',
            network: 'facebook_pages',
            order: $('.main .quick-replies-analytics-time-order').attr('data-type'),
            id: Main.connected_account_id,
            page: page
        };
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'inbox_load_facebook_pages_analytics_quick_replies');
        
    };
    
    /*
     * Display analytics for Private Messages
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.7.4
     */
    Main.inbox_load_facebook_pages_analytics_private_messages = function (page) {

        var data = {
            action: 'inbox_load_facebook_pages_analytics_private_messages',
            network: 'facebook_pages',
            order: $('.main .private-messages-analytics-time-order').attr('data-type'),
            id: Main.connected_account_id,
            page: page
        };
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'inbox_load_facebook_pages_analytics_private_messages');
        
    };
   
    /*******************************
    RESPONSES
    ********************************/
   
    /*
     * Display Facebook Pages search response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_search_for_facebook_pages = function ( status, data ) {
        
        // Display network slug
        $('.inbox-page').attr('data-network', data.words.network_slug);
        
        // Display network name
        $('.inbox-page').attr('data-network-name', data.words.network_name); 

        if ( typeof Main.connected_account_id === 'undefined' ) {
        
            var no_inbox = '<div class="row">'
                                + '<div class="col-xl-12">'        
                                    + '<p class="no-accounts-selected">' + data.words.no_page_inbox_connected + '</p>'
                                + '</div>'
                            + '</div>';

            // Display no inbox found message
            $('.inbox-page .inbox-network-content').html(no_inbox);
        
        }
    
        // Verify if the success response exists
        if ( status === 'success' ) {
            
            var allaccounts = '';
            
            // Set current page and display pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.col-xl-3.inbox-page-accounts-list', data.total);

            // List all Facebook Pages
            for (var u = 0; u < data.accounts_list.length; u++) {
                
                var user_avatar = url + 'assets/img/avatar-placeholder.png';
                
                if ( data.accounts_list[u].user_avatar ) {
                    user_avatar = data.accounts_list[u].user_avatar;
                }
                
                var active = '';
                
                if ( typeof Main.connected_account_id !== 'undefined' ) {
                
                    if ( Main.connected_account_id === data.accounts_list[u].network_id ) {
                        active = ' class="inbox-account-details-active"';
                    }
                    
                }
                    
                allaccounts += '<li' + active + '>'
                                    + '<div class="row">'
                                        + '<div class="col-xl-8 col-6">'
                                            + '<h3>'
                                                + '<img src="' + user_avatar + '">'
                                                + data.accounts_list[u].user_name
                                            + '</h3>'
                                        + '</div>'
                                        + '<div class="col-xl-4 col-6 text-right">'
                                            + '<a href="#" class="btn btn-outline-info inbox-account-details" data-id="' + data.accounts_list[u].network_id + '"><i class="icon-user-following"></i> '
                                                + data.words.connect
                                            + '</a>'
                                        + '</div>'                                                            
                                    + '</div>'
                                + '</li>';

            }

            // Display Pages
            $( '.inbox-accounts-results' ).html( '<ul class="inbox-accounts">' + allaccounts + '</ul>' );
            
            // Display search placeholder
            $(document).find('.inbox-search-for-accounts').attr('placeholder', data.words.search_placeholder);
            
        } else {
            
            // Empty the pagination
            $( '.col-xl-3.inbox-page-accounts-list .pagination' ).empty();
            
            // Display no found message
            $( '.inbox-accounts-results' ).html('<p class="no-posts-found">' + data.message + '</p>');
            
            // Display search placeholder
            $(document).find('.inbox-search-for-accounts').attr('placeholder', data.words.search_placeholder);
            
        }

    };
    
    /*
     * Display Facebook Pages inbox
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_facebook_pages_get_inbox = function ( status, data ) {
        
        // Verify if the success response exists
        if ( status === 'success' ) {
            
            var header = '<nav>';
                header += '<div class="nav nav-tabs" id="nav-tab" role="tablist">';
                
            var content = '<div class="tab-content" id="nav-tabContent">';
            
            for ( var e = 0; e < data.params.nav.length; e++ ) {

                var active = '';
                
                if ( e < 1 ) {
                    active = ' active';
                }
                
                var key = Object.keys(data.params.nav[e]);

                header += '<a class="nav-item nav-link' + active + '" data-toggle="tab" href="#' + key[0] + '" role="tab" aria-controls="' + key[0] + '" aria-selected="true">'
                            + data.params.nav[e][key[0]]
                        + '</a>';
                
                content += '<div class="tab-pane fade show' + active + '" id="' + key[0] + '" role="tabpanel" aria-labelledby="' + key[0] + '">';
                    content += e;
                content += '</div>';
                
            }
            
                header += '</nav>';
            header += '</nav>';
            
            // Display no inbox's content
            $('.inbox-page .inbox-network-content').html(header + content);
            
            var conversations = '<div class="row">'
                                    + '<div class="col-xl-4">'
                                        + '<div class="row">'
                                            + '<div class="col-xl-12">'
                                                + '<div class="inbox-filter">'
                                                    + '<div class="dropdown show">'
                                                        + '<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                                                            + data.params.all_converstations
                                                            + '<i class="fas fa-angle-down"></i>'
                                                        + '</a>'
                                                        + '<ul class="dropdown-menu inbox-facebook-conversations-filter" aria-labelledby="dropdownMenuLink">'
                                                            + '<li>'
                                                                + '<a href="#" data-type="all_converstations">' + data.params.all_converstations + '</a>'
                                                            + '</li>'
                                                            + '<li>'
                                                                + '<a href="#" data-type="unread_messages">' + data.params.unread_messages + '</a>'
                                                            + '</li>'                                                    
                                                        + '</ul>'
                                                    + '</div>'
                                                    + '<span></span>'
                                                + '</div>'
                                            + '</div>'
                                        + '</div>';
                                
            var unread = 0;
            
            // Verify if conversations exists
            if ( data.params.conversations.length ) {
                
                conversations += '<ul class="facebook-pages-conversations" tabindex="0">';
                        
                for ( var c = 0; c < data.params.conversations.length; c++ ) {
                    
                    var active = '';
                    
                    if ( data.params.conversations[c].unread_count > 0 ) {
                        active = ' class="conversation-active"';
                        unread++;
                    }
                    
                    var message = data.params.conversations[c].message;
                    
                    if ( message.length > 30 ) {
                        message = data.params.conversations[c].message.substring(0, 30) + ' ...';
                    }
                    
                    conversations += '<li' + active + ' data-conversation="' + data.params.conversations[c].id + '">'
                                        + '<div class="row">'
                                            + '<div class="col-lg-10">'
                                                + '<img src="' + data.params.conversations[c].senders.data[0].user_picture + '" data-email="' + data.params.conversations[c].senders.data[0].email + '">'
                                                + '<h3>' + data.params.conversations[c].senders.data[0].name + '</h3>'
                                                + '<p><strong><em>' + data.params.conversations[c].from.name + ': </em></strong>' + message + '</p>'
                                            + '</div>'
                                            + '<div class="col-lg-2 text-right">'
                                                + 'Thu'
                                            + '</div>'                                        
                                        + '</div>'
                                    + '</li>';
                    
                }
        
                conversations += '</ul>';
                
            } else {
                
                conversations += '<div class="row">'
                                    + '<div class="col-xl-12">'
                                        + '<p class="p-3">' + data.params.no_conversations_found + '</p>'
                                    + '</div>'
                                + '</div>';
                
            }
            
                conversations += '</div>';
                conversations += '<div class="col-xl-8">';
                    conversations += '<div class="panel panel-default">';
                    conversations += '</div>';
                conversations += '</div>';
                    
            conversations += '</div>';
            
            $('#nav-conversations').html(conversations);
            
            if ( $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li').length > 9 ) {
                
                var totalHeight = 0;
                
                for ( var d = 0; d < 10; d++ ) {
                    
                    totalHeight = totalHeight + $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li:eq(' + d + ')').outerHeight() - 1;

                }
                
                $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').css('height', totalHeight);
                
                $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').addClass('scroll-bar-display');
                
            } else {
        
                if ( $(window).width() > 800 && $(window).height() > 600 ) {

                    $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body').css('height', ($(window).height() - 305));
                    $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').css('height', ($(window).height() - 210));

                } else {

                    $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body').css('height', 800);
                    $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').css('height', 800);

                }
                $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').removeClass('scroll-bar-display');
            
            }
            
            $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 .inbox-filter span').text(unread + ' ' + data.params.unread);
            
        } else {
            
            var no_inbox = '<div class="row">'
                                + '<div class="col-xl-12">'        
                                    + '<p class="no-accounts-selected">' + data.words.no_page_inbox_connected + '</p>'
                                + '</div>'
                            + '</div>';
                    
            // Display no inbox found message
            $('.inbox-page .inbox-network-content').html(no_inbox);
            
        }
        
        var connect = '<div class="row">'
                        + '<div class="col-xl-12">'                     
                            + '<div class="inbox-connect-requirement">'
                                + '<p>'
                                    + data.params.facebook_page_not_connected
                                    + '<a href="#" class="facebook-pages-connect-to-bot">'
                                        + '<i class="icon-social-facebook"></i>'
                                        + data.params.connect_bot
                                    + '</a>'
                                + '</p>'
                            + '</div>'
                        + '</div>'
                    + '</div>';
            
        if ( data.params.completed > 0 ) {
            connect = '';
        }
        
        var quick_replies = '<div class="row">'
                            + '<div class="col-xl-12">'
                                + connect
                                + '<div class="row">'
                                    + '<div class="col-xl-3">'
                                        + '<div class="nav flex-column nav-pills" id="quick-replies-tab" role="tablist" aria-orientation="vertical">'
                                            + '<a class="nav-link active" id="v-pills-collections-tab" data-toggle="pill" href="#v-pills-collections" role="tab" aria-controls="v-pills-collections" aria-selected="true"><i class="icon-book-open"></i> ' + data.params.bot_replies + '</a>'
                                            + '<a class="nav-link" id="v-pills-analytics-tab" data-toggle="pill" href="#v-pills-analytics" role="tab" aria-controls="v-pills-analytics" aria-selected="false"><i class="icon-graph"></i> ' + data.params.analytics + '</a>'
                                        + '</div>'
                                    + '</div>'
                                    + '<div class="col-xl-9">'
                                        + '<div class="tab-content" id="v-pills-tabContent">'
                                            + '<div class="tab-pane fade show active" id="v-pills-collections" role="tabpanel" aria-labelledby="v-pills-collections-tab">'
                                                + '<div class="row">'
                                                    + '<div class="col-xl-9 col-sm-9 col-9 input-group quick-replies-search">'
                                                        + '<div class="input-group-prepend">'
                                                            + '<i class="icon-magnifier"></i>'
                                                        + '</div>'
                                                        + '<input type="text" class="form-control quick-replies-for-replies" placeholder="' + data.params.search_replies + '">'
                                                        + '<button type="button" class="quick-replies-cancel-search-for-replies">'
                                                            + '<i class="icon-close"></i>'
                                                        + '</button>'
                                                    + '</div>'
                                                    + '<div class="col-xl-3 col-sm-3 col-3">'
                                                        + '<button type="button" class="quick-replies-new-reply" data-toggle="modal" data-target="#quick-replies-new-reply"><i class="fas fa-plus"></i> ' + data.params.new_reply + '</button>'
                                                    + '</div>'
                                                + '</div>'
                                                + '<div class="row">'
                                                    + '<div class="col-xl-12">'                          
                                                        + '<ul class="quick-replies-collections">'
                                                        + '</ul>'
                                                    + '</div>'
                                                + '</div>'
                                                + '<div class="row">'
                                                    + '<div class="col-xl-12">'
                                                        + '<nav>'
                                                            + '<ul class="pagination" data-type="quick-replies">'
                                                            + '</ul>'
                                                        + '</nav>'
                                                    + '</div>'
                                                + '</div>'
                                            + '</div>'
                                            + '<div class="tab-pane fade" id="v-pills-analytics" role="tabpanel" aria-labelledby="v-pills-analytics-tab">'
                                                + '<div class="row">'
                                                    + '<div class="col-xl-12">'
                                                        + '<span class="quick-replies-analytics-actions"></span>'
                                                        + '<div class="dropdown show">'
                                                            + '<a class="btn btn-secondary btn-md dropdown-toggle quick-replies-analytics-time-order" href="#" role="button" id="dropdownMenuLink" data-type="1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                                                                + '<i class="icon-clock"></i> ' + data.params.h24_hours
                                                            + '</a>'
                                                            + '<div class="dropdown-menu dropdown-menu-action quick-replies-analytics-time-order-option" aria-labelledby="dropdownMenuLink">'
                                                                + '<a class="dropdown-item" href="#" data-type="1"><i class="icon-clock"></i> ' + data.params.h24_hours + '</a>'
                                                                + '<a class="dropdown-item" href="#" data-type="2"><i class="icon-clock"></i> ' + data.params.w1_week + '</a>'
                                                                + '<a class="dropdown-item" href="#" data-type="3"><i class="icon-clock"></i> ' + data.params.m1_month + '</a>'
                                                            + '</div>'
                                                        + '</div>'
                                                    + '</div>'
                                                + '</div>'
                                                + '<div class="row">'
                                                    + '<div class="col-xl-12">'
                                                        + '<ul class="quick-replies-analytics">'
                                                        + '</ul>'
                                                    + '</div>'
                                                + '</div>'
                                                + '<div class="row">'
                                                    + '<div class="col-xl-12">'
                                                        + '<nav>'
                                                            + '<ul class="pagination" data-type="quick-replies-analytics">'
                                                            + '</ul>'
                                                        + '</nav>'
                                                    + '</div>'
                                                + '</div>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>'                           
                                + '</div>'                                
                            + '</div>'
                        + '</div>';
        
        
        $('section.inbox-page > div > div.col-xl-9 > div > div#nav-quick-replies').html(quick_replies);
        
        var private_messages = '<div class="row">'
                                    + '<div class="col-xl-12">'
                                        + connect
                                        + '<div class="row">'
                                            + '<div class="col-xl-3">'
                                                + '<div class="nav flex-column nav-pills" id="quick-replies-tab" role="tablist" aria-orientation="vertical">'
                                                    + '<a class="nav-link active" id="v-messages-collections-tab" data-toggle="pill" href="#v-messages-collections" role="tab" aria-controls="v-messages-collections" aria-selected="true"><i class="icon-book-open"></i> ' + data.params.bot_replies + '</a>'
                                                    + '<a class="nav-link" id="v-messages-analytics-tab" data-toggle="pill" href="#v-messages-analytics" role="tab" aria-controls="v-messages-analytics" aria-selected="false"><i class="icon-graph"></i> ' + data.params.analytics + '</a>'
                                                + '</div>'
                                            + '</div>'
                                            + '<div class="col-xl-9">'
                                                + '<div class="tab-content" id="v-pills-tabContent">'
                                                    + '<div class="tab-pane fade show active" id="v-messages-collections" role="tabpanel" aria-labelledby="v-messages-collections-tab">'
                                                        + '<div class="row">'
                                                            + '<div class="col-xl-9 col-sm-9 col-9 input-group private-messages-search">'
                                                                + '<div class="input-group-prepend">'
                                                                    + '<i class="icon-magnifier"></i>'
                                                                + '</div>'
                                                                + '<input type="text" class="form-control private-messages-search-for-messages" placeholder="' + data.params.search_private_messages + '">'
                                                                + '<button type="button" class="private-messages-cancel-search-for-messages">'
                                                                    + '<i class="icon-close"></i>'
                                                                + '</button>'
                                                            + '</div>'
                                                            + '<div class="col-xl-3 col-sm-3 col-3">'
                                                                + '<button type="button" class="quick-replies-new-message" data-toggle="modal" data-target="#quick-replies-new-message"><i class="fas fa-plus"></i> ' + data.params.new_message + '</button>'
                                                            + '</div>'
                                                        + '</div>'
                                                        + '<div class="row">'
                                                            + '<div class="col-xl-12">'                                        
                                                                + '<ul class="private-messages-collections">'
                                                                + '</ul>'
                                                            + '</div>'
                                                        + '</div>'
                                                        + '<div class="row">'
                                                            + '<div class="col-xl-12">'
                                                                + '<nav>'
                                                                    + '<ul class="pagination" data-type="private-messages">'
                                                                    + '</ul>'
                                                                + '</nav>'
                                                            + '</div>'
                                                        + '</div>'
                                                    + '</div>'
                                                    + '<div class="tab-pane fade" id="v-messages-analytics" role="tabpanel" aria-labelledby="v-messages-analytics-tab">'
                                                        + '<div class="row">'
                                                            + '<div class="col-xl-12">'
                                                                + '<span class="private-messages-analytics-actions"></span>'
                                                                + '<div class="dropdown show">'
                                                                    + '<a class="btn btn-secondary btn-md dropdown-toggle private-messages-analytics-time-order" href="#" role="button" id="dropdownMenuLink" data-type="1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                                                                        + '<i class="icon-clock"></i> ' + data.params.h24_hours
                                                                    + '</a>'
                                                                    + '<div class="dropdown-menu dropdown-menu-action private-messages-analytics-time-order-option" aria-labelledby="dropdownMenuLink">'
                                                                        + '<a class="dropdown-item" href="#" data-type="1"><i class="icon-clock"></i> ' + data.params.h24_hours + '</a>'
                                                                        + '<a class="dropdown-item" href="#" data-type="2"><i class="icon-clock"></i> ' + data.params.w1_week + '</a>'
                                                                        + '<a class="dropdown-item" href="#" data-type="3"><i class="icon-clock"></i> ' + data.params.m1_month + '</a>'
                                                                    + '</div>'
                                                                + '</div>'
                                                            + '</div>'
                                                        + '</div>'
                                                        + '<div class="row">'
                                                            + '<div class="col-xl-12">'
                                                                + '<ul class="private-messages-analytics">'
                                                                + '</ul>'
                                                            + '</div>'
                                                        + '</div>'
                                                        + '<div class="row">'
                                                            + '<div class="col-xl-12">'
                                                                + '<nav>'
                                                                    + '<ul class="pagination" data-type="private-messages-analytics">'
                                                                    + '</ul>'
                                                                + '</nav>'
                                                            + '</div>'
                                                        + '</div>'
                                                    + '</div>'
                                                + '</div>'
                                            + '</div>'                           
                                        + '</div>'                                
                                    + '</div>'
                                + '</div>';
                        
        $('section.inbox-page > div > div.col-xl-9 > div > div#nav-private-messages').html(private_messages);
        
        // Load Quick Replies
        Main.inbox_load_facebook_pages_quick_replies(1);
        
        // Load Analytics for Quick Replies
        Main.inbox_load_facebook_pages_analytics_quick_replies(1);
        
        // Load Private Messages
        Main.inbox_load_facebook_pages_private_messages(1);

        // Load Analytics for Private Messages
        Main.inbox_load_facebook_pages_analytics_private_messages(1);
        
    };
    
    /*
     * Get Facebook Page's conversation
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_facebook_pages_get_conversation = function ( status, data ) {

        // Get user's photo
        var photo = $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li[data-conversation="' + Main.connected_conversation_id + '"] .col-lg-10 img').attr('src');
        
        // Get user's name
        var name = $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li[data-conversation="' + Main.connected_conversation_id + '"] .col-lg-10 h3').text();

        // Get user's email
        var email = $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li[data-conversation="' + Main.connected_conversation_id + '"] .col-lg-10 img').attr('data-email');

        var panel = '<div class="panel-heading">'
                        + '<div class="row">'
                            + '<div class="col-xl-8">'
                                + '<img src="' + photo + '">'
                                + '<h3>' + name + '</h3>'
                                + '<p>' + email + '</p>'
                            + '</div>'
                            + '<div class="col-xl-4 text-right">'
                                + data.params.conversation.length + ' '
                                + data.params.messages
                            + '</div>'
                        + '</div>'
                    + '</div>';
            
        // Verify if the conversation has messages
        if ( data.params.conversation.length ) {

            panel += '<div class="panel-body" tabindex="0"><ul>';

            for ( var c = (data.params.conversation.length - 1); c >= 0; c-- ) {
                
                var attachments = '';
                
                if ( data.params.conversation[c].attachments.data.length ) {
                    
                    for ( var a = 0; a < data.params.conversation[c].attachments.data.length; a++ ) {
                        
                        if ( data.params.conversation[c].attachments.data[a].file_url ) {
                            attachments += '<a href="' + data.params.conversation[c].attachments.data[a].file_url + '" target="_blank"><i class="icon-paper-clip"></i> attachment</a> ';
                        }

                        if ( data.params.conversation[c].attachments.data[a].image_data ) {
                            attachments += '<a href="' + data.params.conversation[c].attachments.data[a].image_data.url + '" target="_blank"><i class="icon-paper-clip"></i> attachment</a> ';
                        }
                        
                        if ( data.params.conversation[c].attachments.data[a].video_data ) {
                            attachments += '<a href="' + data.params.conversation[c].attachments.data[a].video_data.url + '" target="_blank"><i class="icon-paper-clip"></i> attachment</a> ';
                        }
                        
                    }
                    
                }

                // Get post's time
                var d = new Date(); 
                var cdate = d.getTime()/1000;

                // Set time
                var gettime = Main.calculate_time(data.params.conversation[c].created_time, cdate);

                if ( data.params.conversation[c].from.id === data.params.conversation[c].net_id ) {
                    
                    panel += '<li class="my-reply clearfix">'
                                + '<img src="' + data.params.conversation[c].from.user_picture + '" class="avatar">'
                                + '<div class="message-body">'
                                    + '<p>'
                                        + data.params.conversation[c].message
                                    + '</p>'
                                    + '<p>'
                                        + attachments
                                    + '</p>' 
                                + '</div>'
                            + '</li>';
                    
                } else {

                    panel += '<li class="clearfix">'
                                + '<img src="' + data.params.conversation[c].from.user_picture + '" class="avatar">'
                                + '<div class="message-body">'
                                    + '<p class="meta">' + gettime + ' <a href="' + data.params.conversation[c].from.link + '" target="_blank">' + data.params.conversation[c].from.name + '</a> says : </p>'
                                    + '<p>'
                                        + data.params.conversation[c].message
                                    + '</p>'
                                    + '<p>'
                                        + attachments
                                    + '</p>'                        
                                + '</div>'
                            + '</li>';
                
                }

            }

            panel += '</ul>';
            
            panel += '</div>';

        } else {

            panel += '<div class="panel-body" tabindex="0">'
                                + '<div class="col-xl-12">'
                                    + '<p class="p-3">' + data.params.no_conversations_found + '</p>'
                                + '</div>'
                            + '</div>';

        }
        
        panel += '<div class="panel-footer">'
                    + '<div class="row">'
                        + '<div class="col-xl-11">'
                            + '<textarea class="new-message" placeholder="' + data.params.enter_your_reply + '"></textarea>'
                        + '</div>'
                        + '<div class="col-xl-1">'
                            + '<button class="btn btn-warning btn-sm inbox-facebook-pages-send-reply" id="btn-chat">'
                                + '<i class="icon-cursor"></i>'
                            + '</button>'
                        + '</div>'
                    + '</div>'
                + '</div>';
        
        $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-8 .panel').html(panel);
        
        $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body ul').addClass('inbox-facebook-pages-inbox-all-conversations');
        
        $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body').animate({
            scrollTop: $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body ul').outerHeight()
        }, 100);
        
        $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body').css('height', ( $('.main .inbox-page[data-network="facebook-pages"] .facebook-pages-conversations').height() - 100));
        
        /*
         * Show emojis icon
         * 
         * @since   0.0.7.4
         */
        $(document).find('.new-message').emojioneArea({
            pickerPosition: 'top',
            tonesStyle: 'bullet',
            attributes: {
                spellcheck : true,
                autocomplete   : 'on'
            }

        });
        
    };
    
    /*
     * Display reply submission response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_facebook_pages_conversation_reply_message = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);
            
            // Get user's photo
            var photo = $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li[data-conversation="' + Main.connected_conversation_id + '"] .col-lg-10 img').attr('src');

            // Get user's name
            var name = $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li[data-conversation="' + Main.connected_conversation_id + '"] .col-lg-10 h3').text();

            // Get user's email
            var email = $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li[data-conversation="' + Main.connected_conversation_id + '"] .col-lg-10 img').attr('data-email');

            var panel = '<div class="panel-heading">'
                            + '<div class="row">'
                                + '<div class="col-xl-8">'
                                    + '<img src="' + photo + '">'
                                    + '<h3>' + name + '</h3>'
                                    + '<p>' + email + '</p>'
                                + '</div>'
                                + '<div class="col-xl-4 text-right">'
                                    + data.params.conversation.length + ' '
                                    + data.params.messages
                                + '</div>'
                            + '</div>'
                        + '</div>';

            // Verify if the conversation has messages
            if ( data.params.conversation.length ) {

                panel += '<div class="panel-body" tabindex="0"><ul>';

                for ( var c = (data.params.conversation.length - 1); c >= 0; c-- ) {

                    var attachments = '';

                    if ( data.params.conversation[c].attachments.data.length ) {

                        for ( var a = 0; a < data.params.conversation[c].attachments.data.length; a++ ) {

                            if ( data.params.conversation[c].attachments.data[a].file_url ) {
                                attachments += '<a href="' + data.params.conversation[c].attachments.data[a].file_url + '" target="_blank"><i class="icon-paper-clip"></i> attachment</a> ';
                            }

                            if ( data.params.conversation[c].attachments.data[a].image_data ) {
                                attachments += '<a href="' + data.params.conversation[c].attachments.data[a].image_data.url + '" target="_blank"><i class="icon-paper-clip"></i> attachment</a> ';
                            }

                            if ( data.params.conversation[c].attachments.data[a].video_data ) {
                                attachments += '<a href="' + data.params.conversation[c].attachments.data[a].video_data.url + '" target="_blank"><i class="icon-paper-clip"></i> attachment</a> ';
                            }

                        }

                    }

                    // Get post's time
                    var d = new Date(); 
                    var cdate = d.getTime()/1000;

                    // Set time
                    var gettime = Main.calculate_time(data.params.conversation[c].created_time, cdate);

                    if ( data.params.conversation[c].from.id === data.params.conversation[c].net_id ) {

                        panel += '<li class="my-reply clearfix">'
                                    + '<img src="' + data.params.conversation[c].from.user_picture + '" class="avatar">'
                                    + '<div class="message-body">'
                                        + '<p>'
                                            + data.params.conversation[c].message
                                        + '</p>'
                                        + '<p>'
                                            + attachments
                                        + '</p>' 
                                    + '</div>'
                                + '</li>';

                    } else {

                        panel += '<li class="clearfix">'
                                    + '<img src="' + data.params.conversation[c].from.user_picture + '" class="avatar">'
                                    + '<div class="message-body">'
                                        + '<p class="meta">' + gettime + ' <a href="' + data.params.conversation[c].from.link + '" target="_blank">' + data.params.conversation[c].from.name + '</a> says : </p>'
                                        + '<p>'
                                            + data.params.conversation[c].message
                                        + '</p>'
                                        + '<p>'
                                            + attachments
                                        + '</p>'                        
                                    + '</div>'
                                + '</li>';

                    }

                }

                panel += '</ul>';

                panel += '</div>';

            } else {

                panel += '<div class="panel-body" tabindex="0">'
                                    + '<div class="col-xl-12">'
                                        + '<p class="p-3">' + data.params.no_conversations_found + '</p>'
                                    + '</div>'
                                + '</div>';

            }

            panel += '<div class="panel-footer">'
                        + '<div class="row">'
                            + '<div class="col-xl-11">'
                                + '<textarea class="new-message" placeholder="' + data.params.enter_your_reply + '"></textarea>'
                            + '</div>'
                            + '<div class="col-xl-1">'
                                + '<button class="btn btn-warning btn-sm inbox-facebook-pages-send-reply" id="btn-chat">'
                                    + '<i class="icon-cursor"></i>'
                                + '</button>'
                            + '</div>'
                        + '</div>'
                    + '</div>';

            $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-8 .panel').html(panel);

            $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body ul').addClass('inbox-facebook-pages-inbox-all-conversations');

            $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body').animate({
                scrollTop: $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body ul').outerHeight()
            }, 100);

            $('.inbox-page div.col-xl-9 #nav-conversations .row > div.col-xl-8 .panel .panel-body').css('height', ( $('.main .inbox-page[data-network="facebook-pages"] .facebook-pages-conversations').height() - 100));

            /*
             * Show emojis icon
             * 
             * @since   0.0.7.4
             */
            $(document).find('.new-message').emojioneArea({
                pickerPosition: 'top',
                tonesStyle: 'bullet',
                attributes: {
                    spellcheck : true,
                    autocomplete   : 'on'
                }

            });
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*
     * Display quick reply creation response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_facebook_pages_quick_reply_create = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);
            
            // Load Quick Replies
            Main.inbox_load_facebook_pages_quick_replies(1);
            
            // Reset form
            $('.facebook-pages-quick-replies-save')[0].reset();
            $('.main .quick-replies-new-reply-message-received-type a[data-type="1"]').click();
            $('.main .quick-replies-new-reply-response-send-type a[data-type="1"]').click();
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*
     * Display private message creation response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_facebook_pages_private_message_create = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);
            
            // Load Private Messages
            Main.inbox_load_facebook_pages_private_messages(1);
            
            // Reset form
            $('.facebook-pages-private-message-save')[0].reset();
            $('.main .private-message-new-message-received-type a[data-type="1"]').click();
            $('.main .private-message-new-response-send-type a[data-type="1"]').click();
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*
     * Display quick replies for selected Facebook Page
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_search_for_facebook_pages_quick_replies = function ( status, data ) {
        
        // Verify if the success response exists
        if ( status === 'success' ) {
            
            // Set current page and display pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .inbox-page[data-network="facebook-pages"] #v-pills-collections', data.total);
            
            var replies = '';

            // List all replies
            for ( var d = 0; d < data.quick_replies.length; d++ ) {
                
                replies += '<li>'
                            + '<nav>'
                                + '<div class="nav nav-tabs" id="nav-tab" role="tablist">'
                                    + '<a class="nav-item nav-link active" id="nav-message-tab-' + data.quick_replies[d].action_id + '" data-toggle="tab" href="#nav-message-' + data.quick_replies[d].action_id + '" role="tab" aria-controls="nav-message-' + data.quick_replies[d].action_id + '" aria-selected="true"><i class="far fa-comment-alt"></i> ' + data.message + '</a>'
                                    + '<a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-response-' + data.quick_replies[d].action_id + '" role="tab" aria-controls="nav-response-' + data.quick_replies[d].action_id + '" aria-selected="false"><i class="fas fa-comment-alt"></i> ' + data.response + '</a>'
                                + '</div>'
                                + '<a href="#" class="pull-right facebook_pages_quick_reply_delete" data-id="' + data.quick_replies[d].action_id + '"><i class="icon-trash"></i></a>'
                            + '</nav>'
                            + '<div class="tab-content">'
                                + '<div class="tab-pane fade show active" id="nav-message-' + data.quick_replies[d].action_id + '" role="tabpanel" aria-labelledby="nav-message-tab-' + data.quick_replies[d].action_id + '">'
                                    + '<p>' + data.quick_replies[d].message + '</p>'
                                + '</div>'
                                + '<div class="tab-pane fade" id="nav-response-' + data.quick_replies[d].action_id + '" role="tabpanel" aria-labelledby="nav-response-' + data.quick_replies[d].action_id + '">'
                                    + '<p>' + data.quick_replies[d].response + '</p>'
                                + '</div>'
                            + '</div>'
                        + '</li>';
                
            }

            // Display all replies
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .quick-replies-collections').html(replies);
            
        } else {
            
            // Empty pagination
            $(document).find('.main .inbox-page[data-network="facebook-pages"] #v-pills-collections .pagination').empty();
            
            // Create the no replies message
            var replies = '<li>'
                              + '<p>' + data.message + '</p>'    
                          + '</li>';
            
            // Display no replies found message
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .quick-replies-collections').html(replies);
            
        }        
        
    };
    
    /*
     * Display private messages for selected Facebook Page
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_search_for_facebook_pages_private_messages = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {
            
            // Set current page and display pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .inbox-page[data-network="facebook-pages"] #v-messages-collections', data.total);
            
            var messages = '';

            // List all replies
            for ( var d = 0; d < data.private_messages.length; d++ ) {
                
                messages += '<li>'
                            + '<nav>'
                                + '<div class="nav nav-tabs" id="nav-tab" role="tablist">'
                                    + '<a class="nav-item nav-link active" id="nav-message-tab-' + data.private_messages[d].action_id + '" data-toggle="tab" href="#nav-message-' + data.private_messages[d].action_id + '" role="tab" aria-controls="nav-message-' + data.private_messages[d].action_id + '" aria-selected="true"><i class="far fa-comment-alt"></i> ' + data.message + '</a>'
                                    + '<a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-response-' + data.private_messages[d].action_id + '" role="tab" aria-controls="nav-response-' + data.private_messages[d].action_id + '" aria-selected="false"><i class="fas fa-comment-alt"></i> ' + data.response + '</a>'
                                + '</div>'
                                + '<a href="#" class="pull-right facebook_pages_private_message_delete" data-id="' + data.private_messages[d].action_id + '"><i class="icon-trash"></i></a>'
                            + '</nav>'
                            + '<div class="tab-content">'
                                + '<div class="tab-pane fade show active" id="nav-message-' + data.private_messages[d].action_id + '" role="tabpanel" aria-labelledby="nav-message-tab-' + data.private_messages[d].action_id + '">'
                                    + '<p>' + data.private_messages[d].message + '</p>'
                                + '</div>'
                                + '<div class="tab-pane fade" id="nav-response-' + data.private_messages[d].action_id + '" role="tabpanel" aria-labelledby="nav-response-' + data.private_messages[d].action_id + '">'
                                    + '<p>' + data.private_messages[d].response + '</p>'
                                + '</div>'
                            + '</div>'
                        + '</li>';
                
            }
            
            // Display all replies
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .private-messages-collections').html(messages);
            
        } else {
            
            // Empty pagination
            $(document).find('.main .inbox-page[data-network="facebook-pages"] #v-messages-collections .pagination').empty();
            
            // Create the no replies message
            var messages = '<li>'
                              + '<p>' + data.message + '</p>'    
                          + '</li>';
            
            // Display no replies found message
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .private-messages-collections').html(messages);
            
        }        
        
    };
    
    /*
     * Display quick reply deletion response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.facebook_pages_quick_reply_delete = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);
            
            // Load Quick Replies
            Main.inbox_load_facebook_pages_quick_replies(1);
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*
     * Display private message deletion response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.facebook_pages_private_message_delete = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);
            
            // Load Private Messages
            Main.inbox_load_facebook_pages_private_messages(1);
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*
     * Display quick reply analytics response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_load_facebook_pages_analytics_quick_replies = function ( status, data ) {
        
        // Verify if the success response exists
        if ( status === 'success' ) {
            
            // Set current page and display pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .inbox-page[data-network="facebook-pages"] #v-pills-analytics', data.total);
            
            var replies = '';

            // List all replies
            for ( var d = 0; d < data.quick_replies.length; d++ ) {
                
                replies += '<li>'
                                + '<nav>'
                                    + '<div class="row">'
                                        + '<div class="col-xl-1 col-lg-2 col-md-2">'
                                            + '<a href="' + data.quick_replies[d].from.link + '" target="_blank">'
                                                + '<img src="' + data.quick_replies[d].from.user_picture + '">'
                                            + '</a>'
                                        + '</div>'
                                        + '<div class="col-xl-11 col-lg-10 col-md-10">'
                                            + '<h6>'
                                                + '<a href="' + data.quick_replies[d].from.link + '" target="_blank">'
                                                    + data.quick_replies[d].from.name
                                                + '</a>'
                                            + '</h6>'
                                            + '<p>' + data.quick_replies[d].message + '</p>'
                                        + '</div>'
                                    + '</div>'
                                + '</nav>'
                                + '<div class="tab-content" id="nav-tabContent">'
                                    + '<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">'
                                        + '<p>' + data.quick_replies[d].response + '</p>'
                                    + '</div>'
                                + '</div>'
                            + '</li>';
                
            }
            
            // Display all replies
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .quick-replies-analytics').html(replies);
            
            // Display the number of actions
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .quick-replies-analytics-actions').text( data.total + ' ' + data.actions );
            
        } else {
            
            // Empty pagination
            $(document).find('.main .inbox-page[data-network="facebook-pages"] #v-pills-analytics .pagination').empty();
            
            // Create the no replies message
            var replies = '<li>'
                              + '<p>' + data.message + '</p>'    
                          + '</li>';
            
            // Display no replies found message
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .quick-replies-analytics').html(replies);
            
            // Display the number of actions
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .quick-replies-analytics-actions').text( '0 ' + data.actions );
            
        }
        
    };
    
    /*
     * Display private messages analytics response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.inbox_load_facebook_pages_analytics_private_messages = function ( status, data ) {
        
        // Verify if the success response exists
        if ( status === 'success' ) {
            
            // Set current page and display pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .inbox-page[data-network="facebook-pages"] #v-messages-analytics', data.total);
            
            var messages = '';

            // List all replies
            for ( var d = 0; d < data.quick_replies.length; d++ ) {
                
                messages += '<li>'
                                + '<nav>'
                                    + '<div class="row">'
                                        + '<div class="col-xl-1 col-lg-2 col-md-2">'
                                            + '<a href="' + data.quick_replies[d].from.link + '" target="_blank">'
                                                + '<img src="' + data.quick_replies[d].from.user_picture + '">'
                                            + '</a>'
                                        + '</div>'
                                        + '<div class="col-xl-11 col-lg-10 col-md-10">'
                                            + '<h6>'
                                                + '<a href="' + data.quick_replies[d].from.link + '" target="_blank">'
                                                    + data.quick_replies[d].from.name
                                                + '</a>'
                                            + '</h6>'
                                            + '<p>' + data.quick_replies[d].message + '</p>'
                                        + '</div>'
                                    + '</div>'
                                + '</nav>'
                                + '<div class="tab-content" id="nav-tabContent">'
                                    + '<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">'
                                        + '<p>' + data.quick_replies[d].response + '</p>'
                                    + '</div>'
                                + '</div>'
                            + '</li>';
                
            }
            
            // Display all replies
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .private-messages-analytics').html(messages);
            
            // Display the number of actions
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .private-messages-analytics-actions').text( data.total + ' ' + data.actions );
            
        } else {
            
            // Empty pagination
            $(document).find('.main .inbox-page[data-network="facebook-pages"] #v-messages-analytics .pagination').empty();
            
            // Create the no replies message
            var messages = '<li>'
                              + '<p>' + data.message + '</p>'    
                          + '</li>';
            
            // Display no replies found message
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .private-messages-analytics').html(messages);
            
            // Display the number of actions
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .private-messages-analytics-actions').text( '0 ' + data.actions );
            
        }
        
    };
    
    /*
     * Display facebook page to bot connection response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.7.4
     */
    Main.methods.facebook_pages_connect_to_bot = function ( status, data ) {

        // Verify if the success response exists
        if ( status === 'success' ) {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);
            
            $(document).find('.main .inbox-page[data-network="facebook-pages"] .inbox-connect-requirement').hide();
            
        } else {
            
            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);
            
        }
        
    };
    
    /*******************************
    ACTIONS
    ********************************/
   
    /*
     * Search for Facebook Pages
     * 
     * @since   0.0.7.4
     */
    $(document).on('keyup', '.main .inbox-page[data-network="facebook-pages"] .inbox-search-for-accounts', function () {
        
        if ( $( this ).val() === '' ) {
            
            // Hide cancel search button
            $( '.inbox-cancel-search-for-accounts' ).fadeOut('slow');
            
        } else {
         
            // Display cancel search button
            $( '.inbox-cancel-search-for-accounts' ).fadeIn('slow');
            
        }
        
        // Load all Facebook's pages
        Main.inbox_load_facebook_pages(1);
        
    }); 
   
    /*
     * Search for quick replies
     * 
     * @since   0.0.7.4
     */
    $(document).on('keyup', '.main .inbox-page[data-network="facebook-pages"] .quick-replies-for-replies', function () {
        
        if ( $( this ).val() === '' ) {
            
            // Hide cancel search button
            $( '.quick-replies-cancel-search-for-replies' ).fadeOut('slow');
            
        } else {
         
            // Display cancel search button
            $( '.quick-replies-cancel-search-for-replies' ).fadeIn('slow');
            
        }
        
        // Load all Facebook Pages Quick Replies
        Main.inbox_load_facebook_pages_quick_replies(1);
        
    }); 
    
    /*
     * Search for private messages
     * 
     * @since   0.0.7.4
     */
    $(document).on('keyup', '.main .inbox-page[data-network="facebook-pages"] .private-messages-search-for-messages', function () {
        
        if ( $( this ).val() === '' ) {
            
            // Hide cancel search button
            $( '.private-messages-cancel-search-for-messages' ).fadeOut('slow');
            
        } else {
         
            // Display cancel search button
            $( '.private-messages-cancel-search-for-messages' ).fadeIn('slow');
            
        }
        
        // Load Private Messages
        Main.inbox_load_facebook_pages_private_messages(1);
        
    }); 
   
    /*
     * Detect pagination click
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .pagination li a', function (e) {
        e.preventDefault();
        
        // Get the page number
        var page = $(this).attr('data-page');
        
        // Display results
        switch ( $(this).closest('ul').attr('data-type') ) {
            
            case 'main-accounts-list':
                Main.inbox_load_facebook_pages(page);
                break;
            
            case 'quick-replies':
                Main.inbox_load_facebook_pages_quick_replies(page);
                break;
            
            case 'quick-replies-analytics':
                Main.inbox_load_facebook_pages_analytics_quick_replies(page);
                break;
            
            case 'private-messages':
                Main.inbox_load_facebook_pages_private_messages(page);
                break;
            
            case 'private-messages-analytics':
                Main.inbox_load_facebook_pages_analytics_private_messages(page);
                break;
            
        }
      
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Cancel search for accounts
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .inbox-cancel-search-for-accounts', function (e) {
        e.preventDefault();
        
        // Empty input
        $('.main .inbox-page[data-network="facebook-pages"] .inbox-search-for-accounts').val('');
        
        // Hide cancel search button
        $( '.inbox-cancel-search-for-accounts' ).fadeOut('slow');
        
        // Load all Facebook's pages
        Main.inbox_load_facebook_pages(1);
      
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Cancel search for quick replies
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .quick-replies-cancel-search-for-replies', function (e) {
        e.preventDefault();
        
        // Empty input
        $('.main .inbox-page[data-network="facebook-pages"] .quick-replies-for-replies').val('');
        
        // Hide cancel search button
        $( '.quick-replies-cancel-search-for-replies' ).fadeOut('slow');
        
        // Load all Facebook Pages Quick Replies
        Main.inbox_load_facebook_pages_quick_replies(1);
      
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Cancel search for private messages
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .private-messages-cancel-search-for-messages', function (e) {
        e.preventDefault();
        
        // Empty input
        $('.main .inbox-page[data-network="facebook-pages"] .private-messages-search-for-messages').val('');
        
        // Hide cancel search button
        $( '.private-messages-cancel-search-for-messages' ).fadeOut('slow');
        
        // Load Private Messages
        Main.inbox_load_facebook_pages_private_messages(1);
      
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });    
    
    /*
     * Load Facebook Pages
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page-accounts-list .dropdown-menu .inbox-load-network[data-network="facebook-pages"]', function (e) {
        e.preventDefault();
        
        // Empty the search field
        $('.main .inbox-page-accounts-list .inbox-search-for-accounts').val('');
       
        // Hide cancel search button
        $( '.inbox-cancel-search-for-accounts' ).fadeOut('slow');
        
        // Load all Facebook's pages
        Main.inbox_load_facebook_pages(1);
        
        if ( typeof Main.connected_account_id !== 'undefined' ) {

            delete Main.connected_account_id;

        }
        
        // Add selected option
        $('.main .inbox-page-accounts-list .inbox-dropdown-select-social-network ').html($(this).html());
        $('.main .inbox-page-accounts-list .inbox-dropdown-select-social-network ').attr('data-network', $(this).attr('data-network'));
      
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Connect a Facebook's Page Inbox
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .inbox-page-accounts-list .inbox-account-details', function (e) {
        e.preventDefault();
        
        // Remove active class
        $('.main .inbox-page[data-network="facebook-pages"] .inbox-page-accounts-list .inbox-accounts li').removeClass('inbox-account-details-active');
        
        // Add active class
        $(this).closest('li').addClass('inbox-account-details-active');
        
        // Get the page's id
        var id = $(this).attr('data-id');
        
        var data = {
            action: 'inbox_facebook_pages_get_inbox',
            network: 'facebook_pages',
            id: id
        };
        
        // Add connected Facebook Page
        Main.connected_account_id = id;
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'inbox_facebook_pages_get_inbox');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Filter Facebook's Page Conversations
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .inbox-facebook-conversations-filter li a', function (e) {
        e.preventDefault();
        
        if ( $(this).attr('data-type') === 'all_converstations' ) {
            
            // Display all conversations
            $('.main .inbox-page[data-network="facebook-pages"] .facebook-pages-conversations > li').show();
            
            // Display only active conversations
            $('.main .inbox-page[data-network="facebook-pages"] .facebook-pages-conversations > li.conversation-active').show();
            
            if ( $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li').length > 9 ) {
                
                $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').addClass('scroll-bar-display');
                
            }
            
        } else if ( $(this).attr('data-type') === 'unread_messages' ) {
            
            // Hide all conversations
            $('.main .inbox-page[data-network="facebook-pages"] .facebook-pages-conversations > li').hide();
            
            // Display only active conversations
            $('.main .inbox-page[data-network="facebook-pages"] .facebook-pages-conversations > li.conversation-active').show();
            
            if ( $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations li.conversation-active').length > 9 ) {
                
                $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').addClass('scroll-bar-display');
                
            } else {
        
                $('section.inbox-page > div > div.col-xl-9 > div > div#nav-conversations > .row > div.col-xl-4 ul.facebook-pages-conversations').removeClass('scroll-bar-display');
                
            }
            
        }
        
    });
    
    /*
     * Filter Facebook's Page Conversations
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .facebook-pages-conversations li', function (e) {
        e.preventDefault();
        
        // Get the conversation's id
        var conversation_id = $(this).attr('data-conversation');
        
        var data = {
            action: 'inbox_facebook_pages_get_conversation',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            conversation_id: conversation_id
        };
        
        // Add connected Facebook Page's Conversation
        Main.connected_conversation_id = conversation_id;
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'inbox_facebook_pages_get_conversation');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Send a new reply
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] #nav-conversations .inbox-facebook-pages-send-reply', function (e) {
        e.preventDefault();
        
        // Get reply
        var new_message = $('.main .inbox-page[data-network="facebook-pages"] #nav-conversations .new-message').val();
        
        var data = {
            action: 'inbox_facebook_pages_conversation_reply_message',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            conversation_id: Main.connected_conversation_id,
            reply: new_message
        };
        
        // Set CSRF
        data[$('.facebook-pages-quick-replies-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-quick-replies-save').attr('data-csrf') + '"]').val();
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'inbox_facebook_pages_conversation_reply_message');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Change new quick reply message type
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .quick-replies-new-reply-message-received-type a', function (e) {
        e.preventDefault();
        
        // Get type
        var type = $(this).attr('data-type');

        // Add type
        $('.quick-replies-new-reply-message-received').attr('data-type', type);
        
        // Add text
        $('.quick-replies-new-reply-message-received').html($(this).html());
        
    }); 
    
    /*
     * Change new quick reply response type
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .quick-replies-new-reply-response-send-type a', function (e) {
        e.preventDefault();
        
        // Get type
        var type = $(this).attr('data-type');

        // Add type
        $('.quick-replies-new-reply-response-send').attr('data-type', type);
        
        // Add text
        $('.quick-replies-new-reply-response-send').html($(this).html());
        
    });
    
    /*
     * Delete a quick response
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .facebook_pages_quick_reply_delete', function (e) {
        e.preventDefault();
        
        // Get quick reply id
        var reply_id = $(this).attr('data-id');
        
        var data = {
            action: 'facebook_pages_quick_reply_delete',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            reply_id: reply_id
        };
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'facebook_pages_quick_reply_delete');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Delete a private message
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .facebook_pages_private_message_delete', function (e) {
        e.preventDefault();
        
        // Get message id
        var message_id = $(this).attr('data-id');
        
        var data = {
            action: 'facebook_pages_private_message_delete',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            message_id: message_id
        };
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'facebook_pages_private_message_delete');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Order analytics by time
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .inbox-page[data-network="facebook-pages"] .quick-replies-analytics-time-order-option a', function (e) {
        e.preventDefault();
        
        // Get type
        var type = $(this).attr('data-type');

        // Add type
        $('.quick-replies-analytics-time-order').attr('data-type', type);
        
        // Add text
        $('.quick-replies-analytics-time-order').html($(this).html());
        
        // Load Analytics for Quick Replies
        Main.inbox_load_facebook_pages_analytics_quick_replies(1);
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Order analytics by time
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .private-messages-analytics-time-order-option a', function (e) {
        e.preventDefault();
        
        // Get type
        var type = $(this).attr('data-type');

        // Add type
        $('.private-messages-analytics-time-order').attr('data-type', type);
        
        // Add text
        $('.private-messages-analytics-time-order').html($(this).html());
        
        // Load Analytics for Private Messages
        Main.inbox_load_facebook_pages_analytics_private_messages(1);
        
    });
    
    /*
     * Change new private message type
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .private-message-new-message-received-type a', function (e) {
        e.preventDefault();
        
        // Get type
        var type = $(this).attr('data-type');

        // Add type
        $('.private-messages-new-message-received').attr('data-type', type);
        
        // Add text
        $('.private-messages-new-message-received').html($(this).html());
        
    }); 
    
    /*
     * Change new private response type
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .private-message-new-response-send-type a', function (e) {
        e.preventDefault();
        
        // Get type
        var type = $(this).attr('data-type');

        // Add type
        $('.private-messages-new-response-send').attr('data-type', type);
        
        // Add text
        $('.private-messages-new-response-send').html($(this).html());
        
    });
    
    /*
     * Connect Facebook Page to bot
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */ 
    $(document).on('click', '.main .facebook-pages-connect-to-bot', function (e) {
        e.preventDefault();
        
        var data = {
            action: 'facebook_pages_connect_to_bot',
            network: 'facebook_pages',
            id: Main.connected_account_id
        };
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'GET', data, 'facebook_pages_connect_to_bot');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });    
   
    /*******************************
    FORMS
    ********************************/
   
    /*
     * Save quick reply
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */
    $('.facebook-pages-quick-replies-save').submit(function (e) {
        e.preventDefault();
        
        // Get message
        var question = $('.quick-replies-new-reply-question').val();
        
        // Get response
        var response = $('.quick-replies-new-reply-response').val();
        
        // Get question's type
        var question_type = $('.quick-replies-new-reply-message-received').attr('data-type');
        
        // Get response's type
        var response_type = $('.quick-replies-new-reply-response-send').attr('data-type');        
        
        var data = {
            action: 'inbox_facebook_pages_quick_reply_create',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            question_type: question_type,
            question: question,
            response_type: response_type,
            response: response
        };
        
        // Set CSRF
        data[$('.facebook-pages-quick-replies-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-quick-replies-save').attr('data-csrf') + '"]').val();
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'inbox_facebook_pages_quick_reply_create');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });
    
    /*
     * Save private messages
     * 
     * @param object e with global object
     * 
     * @since   0.0.7.4
     */
    $('.facebook-pages-private-message-save').submit(function (e) {
        e.preventDefault();
        
        // Get message
        var question = $('.private-messages-new-message-question').val();
        
        // Get response
        var response = $('.private-messages-new-message-response').val();
        
        // Get question's type
        var question_type = $('.private-messages-new-message-received').attr('data-type');
        
        // Get response's type
        var response_type = $('.private-messages-new-response-send').attr('data-type');        
        
        var data = {
            action: 'inbox_facebook_pages_private_message_create',
            network: 'facebook_pages',
            id: Main.connected_account_id,
            question_type: question_type,
            question: question,
            response_type: response_type,
            response: response
        };
        
        // Set CSRF
        data[$('.facebook-pages-private-message-save').attr('data-csrf')] = $('input[name="' + $('.facebook-pages-private-message-save').attr('data-csrf') + '"]').val();
        
        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/inbox', 'POST', data, 'inbox_facebook_pages_private_message_create');
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });    
    
    // Load default methods
    if ( $('.inbox-dropdown-select-social-network').attr('data-network') === 'facebook-pages' ) {
        
        // Load all Facebook's pages
        Main.inbox_load_facebook_pages(1);
        
        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    }
    
});