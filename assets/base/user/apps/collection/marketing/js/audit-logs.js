/*
 * Marketing Audit Logs javascript file
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
     * Load messages stats chart
     * 
     * @since   0.0.8.0
     */
    Main.messages_stats_chart = function () {

        // Create an object with form data
        var data = {
            action: 'messages_for_graph',
            page_id: $('.marketing-select-stats-facebook-page').attr('data-id')
        };

        // Set CSRF
        data[$('.main .marketing-page').attr('data-csrf-name')] = $('.main .marketing-page').attr('data-csrf-hash');

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'messages_for_graph');

    };

    /*
     * Load messages by popularity
     * 
     * @param integer page contains the page number
     * 
     * @since   0.0.8.0
     */
    Main.messages_by_popularity = function (page) {

        // Create an object with form data
        var data = {
            action: 'messages_by_popularity',
            page_id: $('.main .marketing-select-keywords-facebook-page').attr('data-id'),
            page: page
        };

        // Set CSRF
        data[$('.main .marketing-page').attr('data-csrf-name')] = $('.main .marketing-page').attr('data-csrf-hash');

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'messages_by_popularity');

    };

    /*******************************
    ACTIONS
    ********************************/

    /*
     * Search for Facebook Pages in the Keywords Stats
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main .marketing-search-for-stats-facebook-page', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'load_connected_pages',
            key: $(this).val()
        };

        // Set CSRF
        data[$('.main .marketing-page').attr('data-csrf-name')] = $('.main .marketing-page').attr('data-csrf-hash');

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'facebook_pages_list_graph');

    });

    /*
     * Search for Facebook Pages in Graph Stats
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('keyup', '.main .marketing-search-for-keywords-facebook-page', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'load_connected_pages',
            key: $(this).val()
        };

        // Set CSRF
        data[$('.main .marketing-page').attr('data-csrf-name')] = $('.main .marketing-page').attr('data-csrf-hash');

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'facebook_pages_list');

    });

    /*
     * Get Facebook Pages for Keywords Stats
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .marketing-select-keywords-facebook-page', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'load_connected_pages'
        };

        // Set CSRF
        data[$('.main .marketing-page').attr('data-csrf-name')] = $('.main .marketing-page').attr('data-csrf-hash');

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'facebook_pages_list');

    });

    /*
     * Get Facebook Pages for Graph Stats
     * 
     * @param object e with global object
     * 
     * @since   0.0.8.0
     */
    $(document).on('click', '.main .marketing-select-stats-facebook-page', function (e) {
        e.preventDefault();

        // Create an object with form data
        var data = {
            action: 'load_connected_pages'
        };

        // Set CSRF
        data[$('.main .marketing-page').attr('data-csrf-name')] = $('.main .marketing-page').attr('data-csrf-hash');

        // Make ajax call
        Main.ajax_call(url + 'user/app-ajax/marketing', 'POST', data, 'facebook_pages_list_graph');

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

            case 'popularity-messages':

                // Load messages by popularity
                Main.messages_by_popularity(page);

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
    $( document ).on( 'click', '.main .marketing-page .dropdown-menu a', function (e) {
        e.preventDefault();
        
        // Get Dropdown's ID
        var id = $(this).attr('data-id');
        
        // Set id
        $(this).closest('.dropdown').find('.btn-secondary').attr('data-id', id);

        // Set specifi text
        $(this).closest('.dropdown').find('.btn-secondary').html($(this).html());

        // Reload the results
        if ( $(this).closest('ul').hasClass('marketing-keywords-stats-pages-list') ) {

            // Load messages by popularity
            Main.messages_by_popularity(1);

        } else {

            // Load messages stats chart
            Main.messages_stats_chart();

        }

        // Display loading animation
        $('.page-loading').fadeIn('slow');
        
    });

    /*******************************
    RESPONSES
    ********************************/

    /*
     * Display Facebook Pages for Keywords Stats
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.facebook_pages_list = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Pages var
            var pages = '';
    
            // List 10 pages
            for (var c = 0; c < data.pages.length; c++) {
    
                pages += '<li class="list-group-item">'
                    + '<a href="#" data-id="' + data.pages[c].network_id + '">'
                        + data.pages[c].user_name
                    + '</a>'
                + '</li>';
    
            } 

            // Display Facebook Pages
            $('.main .marketing-keywords-stats-pages-list').html(pages);

        } else {

            // No found pages message
            var message = '<li class="no-results">'
                    + data.message
                + '</li>';

            // Display no pages message
            $('.main .marketing-keywords-stats-pages-list').html(message);

        }

    };

    /*
     * Display Facebook Pages for Graph Stats
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.facebook_pages_list_graph = function (status, data) {

        // Verify if the success response exists
        if (status === 'success') {

            // Pages var
            var pages = '';
    
            // List 10 pages
            for (var c = 0; c < data.pages.length; c++) {
    
                pages += '<li class="list-group-item">'
                    + '<a href="#" data-id="' + data.pages[c].network_id + '">'
                        + data.pages[c].user_name
                    + '</a>'
                + '</li>';
    
            } 

            // Display Facebook Pages
            $('.main .marketing-stats-pages-list').html(pages);

        } else {

            // No found pages message
            var message = '<li class="no-results">'
                    + data.message
                + '</li>';

            // Display no pages message
            $('.main .marketing-stats-pages-list').html(message);

        }

    };

    /*
     * Display messages By Popularity
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.messages_by_popularity = function (status, data) {

        // Hide pagination
        $('.main .table-responsive .pagination').hide();

        // Verify if the success response exists
        if (status === 'success') {

            // Show pagination
            $('.main .table-responsive .pagination').fadeIn('slow');

            // Display the pagination
            Main.pagination.page = data.page;
            Main.show_pagination('.main .table-responsive', data.total);

            // messages
            var messages = '';

            // List all messages
            for ( var r = 0; r < data.messages.length; r++ ) {

                // Set the group span
                var span = '<span class="span-group">'
                                + 'group'
                            + '</span>';

                // Verify if the message's response is text
                if ( data.messages[r].type === '1' ) {

                    // Set the text span
                    span = '<span class="span-text">'
                                + 'text'
                            + '</span>';
                    
                }

                // Set message to the list
                messages += '<tr>'
                            + '<td>'
                                + '<i class="lni-cloudnetwork"></i>'
                                + data.messages[r].name
                            + '</td>'
                            + '<td>'
                                + span
                            + '</td>'
                            + '<td>'
                                + data.messages[r].number
                            + '</td>'
                        + '</tr>';
            
            }

            // Display the messages
            $('.main .table-responsive tbody').html(messages);

        } else {

            // Set no messages message
            var no_messages = '<tr>'
                            + '<td colspan="4">'
                                + data.message
                            + '</td>'
                        + '</tr>';

            // Display no messages message
            $('.main .table-responsive tbody').html(no_messages);

        }

    };

    /*
     * Generate a Graph
     * 
     * @param string status contains the response status
     * @param object data contains the response content
     * 
     * @since   0.0.8.0
     */
    Main.methods.messages_for_graph = function (status, data) {

        // Labels array
        var labels = [];

        // Count array
        var count = [];
        
        // Colors array
        var colors = [];

        // Get the graph id
        var ctx = document.getElementById('messages-stats-chart');

        // Verify if the success response exists
        if (status === 'success') {
            
            // List messages
            for ( var r = 0; r < data.messages.length; r++ ) {

                // Explode date
                var dat = data.messages[r].datetime.split('-');

                // Set date
                labels.push(dat[2] + '/' + dat[1]);

                // Set count
                count.push(data.messages[r].number);

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
                    label: data.words.number_bot_messages,
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

    // Load messages stats chart
    Main.messages_stats_chart();

    // Load messages by popularity
    Main.messages_by_popularity(1);

});