/*
 * Automatizations javascript file
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
        data[$('.main .marketing-create-automatization').attr('data-csrf')] = $('input[name="' + $('.main .marketing-create-automatization').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'get_all_categories');

    }

    /*
     * Get all automatizations
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.8.0
     */
    Main.load_automatizations = function (page) {

        // Prepare data to request
        var data = {
            action: 'load_automatizations',
            key: $('.main .automatizations-key').val(),
            page: page
        };

        // Set CSRF
        data[$('.main .marketing-create-automatization').attr('data-csrf')] = $('input[name="' + $('.main .marketing-create-automatization').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'load_automatizations');

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

    /*******************************
    ACTIONS
    ********************************/

    /*
     * Search for automatizations
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main .automatizations-key', function (e) {
        e.preventDefault();

        if ($(this).val() === '') {

            // Hide button
            $('.main .cancel-automatizations-search').fadeOut('slow');

        } else {

            // Display the cancel button
            $('.main .cancel-automatizations-search').fadeIn('slow');

        }

        // Load automatizations
        Main.load_automatizations(1);   

    });

    /*
     * Search for suggestions
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main #create-new-automatization .marketing-search-for-suggestions', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'suggestions_groups',
            key: $(this).val()
        };

        // Set CSRF
        data[$('.main .marketing-create-automatization').attr('data-csrf')] = $('input[name="' + $('.main .marketing-create-automatization').attr('data-csrf') + '"]').val();

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
    $(document).on('click', '.main #create-new-automatization .marketing-select-suggestions-group', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'suggestions_groups'
        };

        // Set CSRF
        data[$('.main .marketing-create-automatization').attr('data-csrf')] = $('input[name="' + $('.main .marketing-create-automatization').attr('data-csrf') + '"]').val();

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
    $( document ).on( 'click', '.main #create-new-automatization .dropdown-menu a', function (e) {
        e.preventDefault();
        
        // Get Dropdown's ID
        var id = $(this).attr('data-id');
        
        // Set id
        $(this).closest('.dropdown').find('.btn-secondary').attr('data-id', id);

        // Set specifi text
        $(this).closest('.dropdown').find('.btn-secondary').html($(this).html());
        
    });

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

            case 'automatizations':

                // Load automatizations
                Main.load_automatizations(page);

                break;

        }

        // Display loading animation
        $('.page-loading').fadeIn('slow');

        // Unselect
        $('.main #all-automatizations-select').prop('checked', false);

    });

    /*
     * Detect all automatizations selection
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */ 
    $( document ).on( 'click', '.main #all-automatizations-select', function (e) {

        setTimeout(function(){
            
            if ( $( '.main #all-automatizations-select' ).is(':checked') ) {

                $( '.main .automatizations-list input[type="checkbox"]' ).prop('checked', true);

            } else {

                $( '.main .automatizations-list input[type="checkbox"]' ).prop('checked', false);

            }
        
        },500);
        
    });

    /*
     * Delete automatizations
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */ 
    $( document ).on( 'click', 'main .delete-automatizations', function (e) {
        
        // Get all selected automatizations
        var automatizations = $('.main .automatizations-list input[type="checkbox"]');
        
        // Default selected value
        var selected = [];
        
        // List all automatizations
        for ( var d = 0; d < automatizations.length; d++ ) {

            // Verify if is checked
            if ( automatizations[d].checked ) {
                selected.push($(automatizations[d]).attr('data-id'));
            }
            
        }
        
        if ( selected.length < 1 ) {
            
            // Display alert
            Main.popup_fon('sube', words.please_select_automatizations, 1500, 2000);
            return;
            
        }
        
        // Create an object with form data
        var data = {
            action: 'delete_automatizations',
            automatizations: Object.entries(selected)
        };

        // Set CSRF
        data[$('.main .marketing-create-automatization').attr('data-csrf')] = $('input[name="' + $('.main .marketing-create-automatization').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'delete_automatizations');

        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });

    /*
     * Cancel the automatizations search
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .cancel-automatizations-search', function (e) {
        e.preventDefault();

        // Empty the input
        $('.main .automatizations-key').val('');

        // Hide button
        $('.main .cancel-automatizations-search').fadeOut('slow');

        // Load automatizations
        Main.load_automatizations(1);   

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
            $('.main #create-new-automatization .marketing-suggestions-list').html(groups);

        } else {

            // No found groups message
            var message = '<li class="no-results">'
                    + data.message
                + '</li>';

            // Display no groups message
            $('.main #create-new-automatization .marketing-suggestions-list').html(message);

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
    Main.methods.save_automatization = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Display success alert
            Main.popup_fon('subi', data.message, 1500, 2000);

            // Load automatizations
            Main.load_automatizations(1);  

            // Reset the form
            $('.main #create-new-automatization .marketing-create-automatization')[0].reset();

            // Restore default time
            $('.main #create-new-automatization .marketing-select-time').text(words.immediately);
            $('.main #create-new-automatization .marketing-select-time').attr('data-id', '0');

            // Restore suggestions
            $('.main #create-new-automatization .marketing-select-suggestions-group').text(words.suggestions_groups);
            $('.main #create-new-automatization .marketing-select-suggestions-group').removeAttr('data-id');
            $('.main #create-new-automatization .marketing-search-for-suggestions').val('');

            // Show message
            $('.main #create-new-automatization button[data-target="#menu-text-reply"]').attr('aria-expanded', 'true');
            $('.main #create-new-automatization button[data-target="#menu-suggestions"]').attr('aria-expanded', 'false');
            $('.main #create-new-automatization button[data-target="#menu-text-reply"]').removeClass('collapsed');
            $('.main #create-new-automatization button[data-target="#menu-suggestions"]').addClass('collapsed'); 
            $('.main #create-new-automatization #menu-text-reply').addClass('show'); 
            $('.main #create-new-automatization #menu-suggestions').removeClass('show');           

            // Unselect selected categories
            $('.main .all-categories-list .select-category').removeClass('selected-category');

            // Unselect
            $( '.main #all-automatizations-select' ).prop('checked', false);

        } else {

            // Display error alert
            Main.popup_fon('sube', data.message, 1500, 2000);

        }

    };

    /*
     * Display the automatizations
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.load_automatizations = function (status, data) {

        // Hide pagination
        $('.main .marketing-list .pagination').hide();

        // Verify if the success response exists
        if (status === 'success') {

            // Show pagination
            $('.main .marketing-list .pagination').fadeIn('slow');

            // Display the pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .marketing-list', data.total);

            // Automatizations var
            var automatizations = '';

            // List 10 automatizations
            for (var c = 0; c < data.automatizations.length; c++) {

                automatizations += '<li>'
                            + '<div class="row">'
                                + '<div class="col-12">'
                                    + '<a href="' + url + 'user/app/marketing?p=automatizations&automatization=' + data.automatizations[c].automatization_id + '" class="show-group">'
                                        + '<div class="checkbox-option-select">'
                                            + '<input id="marketing-reply-' + data.automatizations[c].automatization_id + '" name="marketing-reply-' + data.automatizations[c].automatization_id + '" type="checkbox" data-id="' + data.automatizations[c].automatization_id + '">'
                                            + '<label for="marketing-reply-' + data.automatizations[c].automatization_id + '"></label>'
                                        + '</div>'
                                        + data.automatizations[c].name
                                    + '</a>'
                                + '</div>'
                            + '</div>'
                        + '</li>';

            }

            // Display automatizations
            $('.main .automatizations-list').html(automatizations);

        } else {

            // No found automatizations message
            var message = '<li class="found-results">'
                    + data.message
                + '</li>';

            // Display no automatizations message
            $('.main .automatizations-list').html(message);

        }

    };

    /*
     * Display the automatizations deletion response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.delete_automatizations = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Display success alert
            Main.popup_fon('subi', data.message, 1500, 2000);

            // Load automatizations
            Main.load_automatizations(1);

            // Unselect
            $( '.main #all-automatizations-select' ).prop('checked', false);

        } else {

            // Display error alert
            Main.popup_fon('sube', data.message, 1500, 2000);

        }

    };

    /*******************************
    FORMS
    ********************************/

    /*
     * Create an automatization
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('submit', '.main #create-new-automatization .marketing-create-automatization', function (e) {
        e.preventDefault();

        // Get automazation's name
        var name = $(this).find('.automatization-name').val();

        // Categories
        var categories = [];
        
        // Get categories
        var selected_categories = $('.main #create-new-automatization .selected-category');

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
            action: 'save_automatization',
            name: name,
            categories: categories,
            time: $('.main #create-new-automatization .marketing-select-time').attr('data-id')
        };

        if ( $(this).find('button[data-target="#menu-text-reply"]').hasClass('collapsed') ) {

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

            if ( $('.reply-text-message').val().trim().length < 4 ) {

                // Display error alert
                Main.popup_fon('sube', words.please_enter_text_reply, 1500, 2000);
                return;

            }

            // Set message
            data['message'] = $(this).find('.reply-text-message').val();

            // Set the response's type
            data['response_type'] = 1;

        }

        // Set CSRF
        data[$(this).attr('data-csrf')] = $('input[name="' + $(this).attr('data-csrf') + '"]').val();


        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'save_automatization');

        // Display loading animation
        $('.page-loading').fadeIn('slow');

    });

    // Load categories
    Main.get_all_categories();

    // Load automatizations
    Main.load_automatizations(1);    

});