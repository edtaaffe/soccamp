/*
 * Automatization javascript file
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
     * Get the categories list by page
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.8.0
     */
    Main.get_categories_by_page = function (page) {

        var data = {
            action: 'get_categories_by_page',
            page: page
        };

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'GET', data, 'get_categories_by_page');

    }

    /*
     * Get all categories
     * 
     * @since   0.0.8.0
     */
    Main.get_all_categories = function () {

        // Prepare data to request
        var data = {
            action: 'get_all_categories',
            key: $('.main .search-category').val()
        };

        // Set CSRF
        data[$('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf')] = $('input[name="' + $('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf') + '"]').val();

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
     * Loads subscribers from database
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.8.0
     */
    Main.load_subscribers = function (page) {

        // Prepare data to send
        var data = {
            action: 'load_automatization_subscribers',
            automatization_id: $('.main .marketing-page-automatization').attr('data-automatization'),
            page: page
        };

        // Set CSRF
        data[$('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf')] = $('input[name="' + $('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'load_automatization_subscribers');

    };

    /*
     * Get automatization's activity for the graph
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.automatization_activity_graph = function () {

        // Create an object with form data
        var data = {
            action: 'automatization_activity_graph',
            automatization_id: $('.main .marketing-page-automatization').attr('data-automatization')
        };

        // Set CSRF
        data[$('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf')] = $('input[name="' + $('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'automatization_activity_graph');
        
    };

    /*******************************
    ACTIONS
    ********************************/

    /*
     * Detect categories manager modal open
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $('.main #categories-manager').on('shown.bs.modal', function (e) {

        // Get Categories List By Page
        Main.get_categories_by_page(1);

    });

    /*
     * Detect when categories are shown
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $('.main #categories').on('shown.bs.collapse', function () {

        // Get ALL Categories
        Main.get_all_categories();

    });

    /*
     * Search for categories
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main .search-category', function (e) {
        e.preventDefault();

        if ($(this).val() === '') {

            // Hide button
            $('.main .cancel-categories-search').fadeOut('slow');

        } else {

            // Display the cancel button
            $('.main .cancel-categories-search').fadeIn('slow');

        }

        // Get ALL Categories
        Main.get_all_categories();

    });

    /*
     * Search for suggestions
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main .marketing-page-automatization .marketing-search-for-suggestions', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'suggestions_groups',
            key: $(this).val()
        };

        // Set CSRF
        data[$('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf')] = $('input[name="' + $('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf') + '"]').val();

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
    $(document).on('click', '.main .marketing-page-automatization .marketing-select-suggestions-group', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'suggestions_groups'
        };

        // Set CSRF
        data[$('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf')] = $('input[name="' + $('.main .marketing-page-automatization .save-automatization-form').attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'load_suggestions_groups');

    });

    /*
     * Delete a category
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .all-categories .delete-category', function (e) {
        e.preventDefault();

        // Get the category's id
        var category_id = $(this).attr('data-id');

        // Create an object with form data
        var data = {
            action: 'delete_category',
            category_id: category_id
        };

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'GET', data, 'delete_category');

        // Display loading animation
        $('.page-loading').fadeIn('slow');

    });

    /*
     * Select a category
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .all-categories-list .select-category', function (e) {
        e.preventDefault();

        // Get the category's id
        var category_id = $(this).attr('data-id');

        // Verify if the category already exists
        if ( $('.main .automatization-categories .panel-heading .select-category[data-id="' + category_id + '"]').length > 0 ) {

            // Remove the selected category from the displayed list
            $('.main .automatization-categories .panel-heading .btn[data-id="' + category_id + '"]').remove();

            // Remove selected class
            $(this).removeClass('selected-category');


        } else {

            // Add selected category to the displayed list
            $($(this).prop('outerHTML')).insertBefore('.main .select-categories');

            // Add selected class
            $(this).addClass('selected-category');

        }

    });

    /*
     * Cancel the category search
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .cancel-categories-search', function (e) {
        e.preventDefault();

        // Empty the input
        $('.main .search-category').val('');

        // Hide button
        $('.main .cancel-categories-search').fadeOut('slow');

        // Get ALL Categories
        Main.get_all_categories();

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

            case 'categories':

                // Get Categories List By Page
                Main.get_categories_by_page(page);

                break;

        }

        // Display loading animation
        $('.page-loading').fadeIn('slow');

    });

    /*
     * Change dropdown option
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */ 
    $( document ).on( 'click', '.main .marketing-page-automatization .dropdown-menu a', function (e) {
        e.preventDefault();
        
        // Get Dropdown's ID
        var id = $(this).attr('data-id');
        
        // Set id
        $(this).closest('.dropdown').find('.btn-secondary').attr('data-id', id);

        // Set specifi text
        $(this).closest('.dropdown').find('.btn-secondary').html($(this).html());
        
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
    Main.methods.get_categories_by_page = function (status, data) {

        // Hide pagination
        $('.main #categories-manager .fieldset-pagination').hide();

        // Verify if the success response exists
        if (status === 'success') {

            // Show pagination
            $('.main #categories-manager .fieldset-pagination').fadeIn('slow');

            // Display the pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main #categories-manager', data.total);

            // Categories var
            var categories = '';

            // List 10 categories
            for (var c = 0; c < data.categories.length; c++) {

                categories += '<li>'
                                + '<div class="row">'
                                    + '<div class="col-10">'
                                        + '<i class="far fa-bookmark"></i>'
                                        + data.categories[c].name
                                    + '</div>'
                                    + '<div class="col-2 text-right">'
                                        + '<button type="button" class="delete-category" data-id="' + data.categories[c].category_id + '">'
                                            + '<i class="icon-trash"></i>'
                                        + '</button>'
                                    + '</div>'
                                + '</div>'
                            + '</li>';

            }

            // Display categories
            $('.main #categories-manager .all-categories').html(categories);

        } else {

            // No categories
            var message = '<li>'
                            + '<div class="row">'
                                + '<div class="col-10">'
                                    + data.message
                                + '</div>'
                            + '</div>'
                        + '</li>';

            // Display no categories message
            $('.main #categories-manager .all-categories').html(message);

        }

    };

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
                if ( $('.main .automatization-categories .panel-heading .select-category[data-id="' + data.categories[c].category_id + '"]').length > 0 ) {
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
     * Display the category creation response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.create_category = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);

            // Get Categories List By Page
            Main.get_categories_by_page(1);

            // Get ALL Categories
            Main.get_all_categories();

            // Reset the form
            $('.main .marketing-create-category')[0].reset();

        } else {

            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);

        }

    };

    /*
     * Display the category delete response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.delete_category = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);

            // Get Categories List By Page
            Main.get_categories_by_page(1);

            // Get ALL Categories
            Main.get_all_categories();

        } else {

            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);

        }

    };

    /*
     * Display the update response
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.save_automatization = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Display alert
            Main.popup_fon('subi', data.message, 1500, 2000);

        } else {

            // Display alert
            Main.popup_fon('sube', data.message, 1500, 2000);

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
            $('.main .marketing-page-automatization .marketing-suggestions-list').html(groups);

        } else {

            // No found groups message
            var message = '<li class="no-results">'
                    + data.message
                + '</li>';

            // Display no groups message
            $('.main .marketing-page-automatization .marketing-suggestions-list').html(message);

        }

    };

    /*
     * Display the automatization's subscribers
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.load_automatization_subscribers = function (status, data) {

        // Hide pagination
        $('.main .automatization-users .pagination').hide();

        // Verify if the success response exists
        if (status === 'success') {

            // Show pagination
            $('.main .automatization-users .pagination').fadeIn('slow');

            // Display the pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .automatization-users', data.total);

            // Subscribers var
            var subscribers = '';

            // List 10 subscribers
            for (var c = 0; c < data.subscribers.length; c++) {

                // Set date
                var date = data.subscribers[c].created;

                // Set time
                var gettime = Main.calculate_time(date, data.date);

                // Default status icon
                var message_status = '<i class="lni-check-mark-circle"></i>';

                // Verify if status is not default
                if ( data.subscribers[c].status > 1 ) {
                    message_status = '<i class="lni-timer"></i>';
                } else if ( data.subscribers[c].status < 1 ) {
                    message_status = '<i class="lni-cross-circle"></i>';
                }

                // Error message var
                var error_message = '';

                // Verify if error exists
                if ( data.subscribers[c].error ) {

                    // Set the error
                    error_message = '<p class="theme-color-red">'
                                    + data.subscribers[c].error
                                + '</p>';

                }

                // Set subscriber
                subscribers += '<li class="list-group-item">'
                                + '<div class="media">'
                                    + '<img class="mr-3" src="' + data.subscribers[c].image + '" alt="Subscriber image">'
                                    + '<div class="media-body">'
                                        + '<h5 class="mt-0">'
                                            + data.subscribers[c].name
                                            + ' ' + message_status
                                        + '</h5>'
                                        + '<p>'
                                            + gettime
                                        + '</p>'
                                        + error_message
                                    + '</div>'
                                + '</div>'
                            + '</li>';

            }

            // Display subscribers
            $('.main .automatization-users .subscribers-list').html(subscribers);

        } else {

            // No found subscribers message
            var message = '<li class="no-results">'
                    + data.message
                + '</li>';

            // Display no subscribers message
            $('.main .automatization-users .subscribers-list').html(message);

        }

    };

    /*
     * Display the automatization's activity for the graph
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.automatization_activity_graph = function (status, data) {

        // Labels array
        var labels = [];

        // Count array
        var count = [];
        
        // Colors array
        var colors = [];

        // Get the graph id
        var ctx = document.getElementById('automatization-stats-chart');

        // Verify if the success response exists
        if (status === 'success') {
            
            // List activities
            for ( var r = 0; r < data.activities.length; r++ ) {

                // Explode date
                var dat = data.activities[r].datetime.split('-');

                // Set date
                labels.push(dat[2] + '/' + dat[1]);

                // Set count
                count.push(data.activities[r].number);

                // Set color
                colors.push('rgba(75, 192, 192, 0.2)');

            }
            
        } else {

            var date = new Date();

            var day = (date.getDate() < 10)?'0'+date.getDate():date.getDate();

            var month = ((date.getMonth()+1) < 10)?'0' + (date.getMonth()+1):(date.getMonth()+1);

            // Set date
            labels.push(day + '/' + month);

            // Set count
            count.push('0');

            // Set color
            colors.push('rgba(75, 192, 192, 0.2)');

        }
        
        // Generate and display Graph
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: data.words.number_activities,
                    data: count,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    xAxes: [{
                        categoryPercentage: .35,
                        barPercentage: .7,
                        display: !0,
                        scaleLabel: {
                            display: !1,
                            labelString: "Month"
                        },
                        gridLines: !1,
                        ticks: {
                            display: !0,
                            beginAtZero: !0,
                            fontColor: "#373f50",
                            fontSize: 13,
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        categoryPercentage: .35,
                        barPercentage: .2,
                        display: !0,
                        scaleLabel: {
                            display: !1,
                            labelString: "Value"
                        },
                        gridLines: {
                            color: "#c3d1e6",
                            drawBorder: !1,
                            offsetGridLines: !1,
                            drawTicks: !1,
                            borderDash: [3, 4],
                            zeroLineWidth: 1,
                            zeroLineColor: "#c3d1e6",
                            zeroLineBorderDash: [3, 4]
                        },
                        ticks: {
                            max: 70,
                            stepSize: 10,
                            display: !0,
                            beginAtZero: !0,
                            fontColor: "#7d879c",
                            fontSize: 13,
                            padding: 10
                        }

                    }]

                },

                title: {
                    display: !1
                },
                hover: {
                    mode: "index"
                },
                tooltips: {
                    enabled: !0,
                    intersect: !1,
                    mode: "nearest",
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: !1,
                    backgroundColor: "#95aac9",
                    titleFontColor: "#ffffff",
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 5,
                        bottom: 5
                    }

                }

            }

        });

    };

    /*******************************
    FORMS
    ********************************/

    /*
     * Update an automatization
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('submit', '.main .marketing-page-automatization .save-automatization-form', function (e) {
        e.preventDefault();

        // Get automazation's name
        var name = $(this).find('.automatization-name').val();

        // Get categories
        var selected_categories = $('.main .automatization-categories .panel-heading .select-category');

        // Categories
        var categories = [];    

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
            action: 'update_automatization',
            automatization_id: $('.main .marketing-page-automatization').attr('data-automatization'),
            name: name,
            categories: categories,
            time: $('.main .new-automatization-body  .marketing-select-time').attr('data-id')
        };

        if ( $('.main .new-automatization-body button[data-target="#menu-text-reply"]').hasClass('collapsed') ) {

            if ( $('.main .new-automatization-body .marketing-select-suggestions-group').attr('data-id') < 1 ) {

                // Display error alert
                Main.popup_fon('sube', words.please_select_suggestion_group, 1500, 2000);
                return;

            }

            // Set group's ID
            data['group'] = $('.main .new-automatization-body .marketing-select-suggestions-group').attr('data-id');

            // Set the response's type
            data['response_type'] = 2;

        } else {

            if ( $('.main .new-automatization-body .text-message').val().trim().length < 4 ) {

                // Display error alert
                Main.popup_fon('sube', words.please_enter_text_reply, 1500, 2000);
                return;

            }

            // Set message
            data['message'] = $('.main .new-automatization-body .text-message').val();

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

    /*
     * Save Category
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('submit', '.main .marketing-create-category', function (e) {
        e.preventDefault();

        // Get the category's name
        var category_name = $(this).find('.category-name').val();

        // Create an object with form data
        var data = {
            action: 'create_category',
            category_name: category_name
        };

        // Set CSRF
        data[$(this).attr('data-csrf')] = $('input[name="' + $(this).attr('data-csrf') + '"]').val();

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'create_category');

        // Display loading animation
        $('.page-loading').fadeIn('slow');

    });
   
    // Load categories
    Main.get_all_categories();

    // Load subscribers
    Main.load_subscribers(1);

    // Get automatization's activity for the graph
    Main.automatization_activity_graph();

});