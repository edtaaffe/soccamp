/*
 * Message javascript file
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
     * Loads subscribers from database
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.8.0
     */
    Main.load_subscribers = function (page) {

        // Prepare data to send
        var data = {
            action: 'load_message_subscribers',
            message_id: $('.main .marketing-page-message').attr('data-message'),
            page: page
        };

        // Set CSRF
        data[$('.main .marketing-page-message').attr('data-csrf-name')] = $('.main .marketing-page-message').attr('data-csrf-hash');

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'load_message_subscribers');

    };

    /*******************************
    ACTIONS
    ********************************/

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

            case 'subscribers':

                // Load subscribers
                Main.load_subscribers(page);

                break;

        }

        // Display loading animation
        $('.page-loading').fadeIn('slow');

    });

    /*******************************
    RESPONSES
    ********************************/

    /*
     * Display the message's subscribers
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.load_message_subscribers = function (status, data) {

        // Hide pagination
        $('.main .promotional-large-widget .pagination').hide();

        // Verify if the success response exists
        if (status === 'success') {

            // Show pagination
            $('.main .promotional-large-widget .pagination').fadeIn('slow');

            // Display the pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .promotional-large-widget', data.total);

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
            $('.main .promotional-large-widget .subscribers-list').html(subscribers);

        } else {

            // No found subscribers message
            var message = '<li class="no-results">'
                    + data.message
                + '</li>';

            // Display no subscribers message
            $('.main .promotional-large-widget .subscribers-list').html(message);

        }

    };

    /*******************************
    FORMS
    ********************************/

    // Load subscribers
    Main.load_subscribers(1);

});