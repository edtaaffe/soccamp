/*
 * Promotional Messages javascript file
*/

jQuery(document).ready(function ($) {
    'use strict';

    /*
     * Get the website's url
     */
    var url = $('meta[name=url]').attr('content');

    /*******************************
    METHODS
    ********************************/

    /*
     * Get all categories
     * 
     * @since   0.0.8.0
     */
    Main.get_all_categories = function () {

        // Prepare data to request
        var data = {
            action: 'get_all_categories'
        };

        // Set CSRF
        data[$('.main .marketing-create-promotional-message').attr('data-csrf')] = $('input[name="' + $('.main .marketing-create-promotional-message').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'get_all_categories');

    }
   
    /*
     * Turn array to object
     * 
     * @param array suggestions contains the suggestions list
     * 
     * @since   0.0.8.0
     * 
     * @return object with suggestions
     */
    Main.to_object = function (suggestions) {

        // Create new object
        var newObj = new Object();

        // Verify if suggestions is an object
        if (typeof suggestions == "object") {

            // List all arrays
            for (var i in suggestions) {

                // Turn array to object
                var thisArray = Main.to_object(suggestions[i]);

                // Add object to newObj
                newObj[i] = thisArray;

            }

        } else {

            // Add object to newObj
            newObj = suggestions;

        }

        return newObj;

    };

    /*
     * Get all promotional messages
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.8.0
     */
    Main.load_promotional_messages = function (page) {

        // Prepare data to request
        var data = {
            action: 'load_promotional_messages',
            key: $('.main .promotional-messages-key').val(),
            page: page
        };

        // Set CSRF
        data[$('.main .marketing-create-promotional-message').attr('data-csrf')] = $('input[name="' + $('.main .marketing-create-promotional-message').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'load_promotional_messages');

    }

    /*******************************
    ACTIONS
    ********************************/

    /*
     * Select categories
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .all-categories-list .select-category', function () {

        // Verify if the category is selected
        if ( $(this).hasClass('selected-category') ) {

            // Add selected class
            $(this).removeClass('selected-category');

        } else {

            // Add selected class
            $(this).addClass('selected-category');

        }

        // Categories
        var categories = [];
        
        // Get categories
        var selected_categories = $('.main #create-new-promotional-message .selected-category');

        // List all categories
        if ( selected_categories.length > 0 ) {

            // List all categories
            for ( var d = 0; d < selected_categories.length; d++ ) {

                // Set category
                categories.push($(selected_categories[d]).attr('data-id'));

            }

            // Turn categories to object
            categories = Main.to_object(categories);

        }

        // Create an object with form data
        var data = {
            action: 'get_subscribers_by_categories',
            categories: categories
        };

        // Set CSRF
        data[$('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf')] = $('input[name="' + $('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'get_subscribers_by_categories');

    });
    
    /*
     * Search for promotional-messages
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main .promotional-messages-key', function (e) {
        e.preventDefault();

        if ($(this).val() === '') {

            // Hide button
            $('.main .cancel-promotional-messages-search').fadeOut('slow');

        } else {

            // Display the cancel button
            $('.main .cancel-promotional-messages-search').fadeIn('slow');

        }

        // Load promotional-messages
        Main.load_promotional_messages(1);   

    });

    /*
     * Search for suggestions
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main #create-new-promotional-message .marketing-search-for-suggestions', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'suggestions_groups',
            key: $(this).val()
        };

        // Set CSRF
        data[$('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf')] = $('input[name="' + $('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'load_suggestions_groups');

    });

    /*
     * Get the suggestions groups
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main #create-new-promotional-message .marketing-select-suggestions-group', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'suggestions_groups'
        };

        // Set CSRF
        data[$('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf')] = $('input[name="' + $('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'load_suggestions_groups');

    });

    /*
     * Change dropdown option
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */ 
    $( document ).on( 'click', '.main #create-new-promotional-message .dropdown-menu a', function (e) {
        e.preventDefault();
        
        // Get Dropdown's ID
        var id = $(this).attr('data-id');
        
        // Set id
        $(this).closest('.dropdown').find('.btn-secondary').attr('data-id', id);

        // Set specifi text
        $(this).closest('.dropdown').find('.btn-secondary').html($(this).html());
        
    });

    /*
     * Displays pagination by page click
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', 'body .pagination li a', function (e) {
        e.preventDefault();

        // Verify which pagination it is based on data's type 
        var page = $(this).attr('data-page');

        // Display results
        switch ($(this).closest('ul').attr('data-type')) {

            case 'promotional-messages':

                // Load promotional-messages
                Main.load_promotional_messages(page);

                break;

        }

        // Display loading animation
        $('.page-loading').fadeIn('slow');

        // Unselect
        $('.main #all-promotional-messages-select').prop('checked', false);

    });

    /*
     * Detect all promotional-messages selection
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */ 
    $( document ).on( 'click', '.main #all-promotional-messages-select', function (e) {

        setTimeout(function(){
            
            if ( $( '.main #all-promotional-messages-select' ).is(':checked') ) {

                $( '.main .promotional-messages-list input[type="checkbox"]' ).prop('checked', true);

            } else {

                $( '.main .promotional-messages-list input[type="checkbox"]' ).prop('checked', false);

            }
        
        },500);
        
    });

    /*
     * Delete promotional-messages
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */ 
    $( document ).on( 'click', 'main .delete-promotional-messages', function (e) {
        
        // Get all selected promotional-messages
        var promotional_messages = $('.main .promotional-messages-list input[type="checkbox"]');
        
        // Default selected value
        var selected = [];
        
        // List all promotional messages
        for ( var d = 0; d < promotional_messages.length; d++ ) {

            // Verify if is checked
            if ( promotional_messages[d].checked ) {
                selected.push($(promotional_messages[d]).attr('data-id'));
            }
            
        }
        
        if ( selected.length < 1 ) {
            
            // Display alert
            Main.popup_fon('sube', words.please_select_promotional_messages, 1500, 2000);
            return;
            
        }
        
        // Create an object with form data
        var data = {
            action: 'delete_promotional_messages',
            promotional_messages: Object.entries(selected)
        };

        // Set CSRF
        data[$('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf')] = $('input[name="' + $('.main #create-new-promotional-message .marketing-create-promotional-message').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'delete_promotional_messages');

        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });

    /*
     * Cancel the promotional-messages search
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .cancel-promotional-messages-search', function (e) {
        e.preventDefault();

        // Empty the input
        $('.main .promotional-messages-key').val('');

        // Hide button
        $('.main .cancel-promotional-messages-search').fadeOut('slow');

        // Load promotional-messages
        Main.load_promotional_messages(1);   

    });

    /*******************************
    RESPONSES
    ********************************/

    /*
     * Display the categories
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.get_all_categories = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Categories var
            var categories = '';

            // List 10 categories
            for (var c = 0; c < data.categories.length; c++) {

                // Selected
                var selected = '';

                // Verify if the category is selected
                if ( $('.main .suggestions-categories .panel-heading .select-category[data-id="' + data.categories[c].category_id + '"]').length > 0 ) {
                    selected = ' selected-category';
                }
                
                // Add category to list
                categories += '<button class="btn btn-primary select-category' + selected + '" type="button" data-id="' + data.categories[c].category_id + '">'
                                + '<i class="far fa-bookmark"></i>'
                                + data.categories[c].name
                            + '</button>';

            }

            // Display categories
            $('.main .all-categories-list').html(categories);

        } else {

            // No categories
            var message = '<div class="row">'
                            + '<div class="col-10">'
                                + data.message
                            + '</div>'
                        + '</div>';

            // Display no categories message
            $('.main .all-categories-list').html(message);

        }

    };

    /*
     * Display the number of subscribers
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.get_subscribers_by_categories = function (status, data) {

        // Display the number of subscribers
        $('.main #create-new-promotional-message .selected-subscribers').text(data.message);

    };

    /*
     * Display the suggestions groups
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.load_suggestions_groups = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Groups var
            var groups = '';
    
            // List 10 groups
            for (var c = 0; c < data.groups.length; c++) {
    
                groups += '<li class="list-group-item">'
                    + '<a href="#" data-id="' + data.groups[c].group_id + '">'
                        + data.groups[c].group_name
                    + '</a>'
                + '</li>';
    
            } 

            // Display groups
            $('.main #create-new-promotional-message .marketing-suggestions-list').html(groups);

        } else {

            // No found groups message
            var message = '<li class="no-results">'
                    + data.message
                + '</li>';

            // Display no groups message
            $('.main #create-new-promotional-message .marketing-suggestions-list').html(message);

        }

    };

    /*
     * Display automatiation saving response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.save_promotional_message = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Display success alert
            Main.popup_fon('subi', data.message, 1500, 2000);

            // Load promotional-messages
            Main.load_promotional_messages(1);  

            // Reset the form
            $('.main #create-new-promotional-message .marketing-create-promotional-message')[0].reset();

            // Restore default time
            $('.main #create-new-promotional-message .marketing-select-time').text(words.immediately);
            $('.main #create-new-promotional-message .marketing-select-time').attr('data-id', '0');

            // Restore suggestions
            $('.main #create-new-promotional-message .marketing-select-suggestions-group').text(words.suggestions_groups);
            $('.main #create-new-promotional-message .marketing-select-suggestions-group').removeAttr('data-id');
            $('.main #create-new-promotional-message .marketing-search-for-suggestions').val('');

            // Show message
            $('.main #create-new-promotional-message button[data-target="#menu-text-promotional"]').attr('aria-expanded', 'true');
            $('.main #create-new-promotional-message button[data-target="#menu-suggestions"]').attr('aria-expanded', 'false');
            $('.main #create-new-promotional-message button[data-target="#menu-text-promotional"]').removeClass('collapsed');
            $('.main #create-new-promotional-message button[data-target="#menu-suggestions"]').addClass('collapsed'); 
            $('.main #create-new-promotional-message #menu-text-promotional').addClass('show'); 
            $('.main #create-new-promotional-message #menu-suggestions').removeClass('show');           

            // Unselect selected categories
            $('.main .all-categories-list .select-category').removeClass('selected-category');

            // Unselect
            $( '.main #all-promotional-messages-select' ).prop('checked', false);

            // Empty selected subscribers fields
            $( '.main #create-new-promotional-message .selected-subscribers' ).empty();            

        } else {

            // Display error alert
            Main.popup_fon('sube', data.message, 1500, 2000);

        }

    };

    /*
     * Display the promotional-messages
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.load_promotional_messages = function (status, data) {

        // Hide pagination
        $('.main .marketing-list .pagination').hide();

        // Verify if the success response exists
        if (status === 'success') {

            // Show pagination
            $('.main .marketing-list .pagination').fadeIn('slow');

            // Display the pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .marketing-list', data.total);

            // promotional-messages var
            var promotional_messages = '';

            // List 10 promotional-messages
            for (var c = 0; c < data.messages.length; c++) {

                promotional_messages += '<li>'
                            + '<div class="row">'
                                + '<div class="col-12">'
                                    + '<a href="' + url + 'user/app/marketing?p=promotional-messages&message=' + data.messages[c].message_id + '" class="show-group">'
                                        + '<div class="checkbox-option-select">'
                                            + '<input id="marketing-promotional-' + data.messages[c].message_id + '" name="marketing-promotional-' + data.messages[c].message_id + '" type="checkbox" data-id="' + data.messages[c].message_id + '">'
                                            + '<label for="marketing-promotional-' + data.messages[c].message_id + '"></label>'
                                        + '</div>'
                                        + data.messages[c].name
                                    + '</a>'
                                + '</div>'
                            + '</div>'
                        + '</li>';

            }

            // Display promotional-messages
            $('.main .promotional-messages-list').html(promotional_messages);

        } else {

            // No found promotional-messages message
            var message = '<li class="found-results">'
                    + data.message
                + '</li>';

            // Display no promotional-messages message
            $('.main .promotional-messages-list').html(message);

        }

    };

    /*
     * Display the promotional-messages deletion response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.delete_promotional_messages = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Display success alert
            Main.popup_fon('subi', data.message, 1500, 2000);

            // Load promotional-messages
            Main.load_promotional_messages(1);

            // Unselect
            $( '.main #all-promotional-messages-select' ).prop('checked', false);

        } else {

            // Display error alert
            Main.popup_fon('sube', data.message, 1500, 2000);

        }

    };
    
    /*******************************
    FORMS
    ********************************/

    /*
     * Create a Promotional Messages
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('submit', '.main #create-new-promotional-message .marketing-create-promotional-message', function (e) {
        e.preventDefault();

        // Get automazation's name
        var name = $(this).find('.promotional-message-name').val();

        // Categories
        var categories = [];
        
        // Get categories
        var selected_categories = $('.main #create-new-promotional-message .selected-category');

        // List all categories
        if ( selected_categories.length > 0 ) {

            // List all categories
            for ( var d = 0; d < selected_categories.length; d++ ) {

                // Set category
                categories.push($(selected_categories[d]).attr('data-id'));

            }

            // Turn categories to object
            categories = Main.to_object(categories);

        } else {

            // Display error alert
            Main.popup_fon('sube', words.please_select_category, 1500, 2000);
            return;
            
        }

        // Create an object with form data
        var data = {
            action: 'save_promotional_message',
            name: name,
            categories: categories,
            time: $('.main #create-new-promotional-message .marketing-select-time').attr('data-id')
        };

        if ( $(this).find('button[data-target="#menu-text-promotional"]').hasClass('collapsed') ) {

            if ( !$(this).find('.marketing-select-suggestions-group').attr('data-id') ) {

                // Display error alert
                Main.popup_fon('sube', words.please_select_suggestion_group, 1500, 2000);
                return;

            }

            // Set group's ID
            data['group'] = $(this).find('.marketing-select-suggestions-group').attr('data-id');

            // Set the response's type
            data['response_type'] = 2;

        } else {

            if ( $('.promotional-text-message').val().trim().length < 4 ) {

                // Display error alert
                Main.popup_fon('sube', words.please_enter_text_promotional, 1500, 2000);
                return;

            }

            // Set message
            data['message'] = $(this).find('.promotional-text-message').val();

            // Set the response's type
            data['response_type'] = 1;

        }

        // Set CSRF
        data[$(this).attr('data-csrf')] = $('input[name="' + $(this).attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'save_promotional_message');

        // Display loading animation
        $('.page-loading').fadeIn('slow');

    });

    // Load categories
    Main.get_all_categories();
  
    // Load promotional messages
    Main.load_promotional_messages(1); 

});