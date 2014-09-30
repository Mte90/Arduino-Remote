$( document ).ready(function() {
    url_green_analog = 'http://' + $('.ip').val() + '/arduino/analog/6/';
    url_green_digital = 'http://' + $('.ip').val() + '/arduino/digital/6/';
    $.get( url_green_digital, function( data ) { 
        $('.led-green').attr('checked', check_bool(data));
            $('.led-green').click(function() {
                if($(this).is(':checked'))  {
                    url_green_ = url_green_analog + '200';
                } else {
                    url_green_ = url_green_analog + '0';
                }
                $.get( url_green_, function( data ) {  });
            });
    });
    url_red_analog = 'http://' + $('.ip').val() + '/arduino/analog/3/';
    url_red_digital = 'http://' + $('.ip').val() + '/arduino/digital/3/';
    $.get( url_red_digital, function( data ) { 
        $('.led-red').attr('checked', check_bool(data));
            $('.led-red').click(function() {
                if($(this).is(':checked'))  {
                    url_red_ = url_red_analog + '200';
                } else {
                    url_red_ = url_red_analog + '0';
                }
                $.get( url_red_, function( data ) {  });
            });
    });
    $('.notification').click(function() {
        $.get( url_green_digital, function( data ) { 
            if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if(!('permission' in Notification)) {
                        Notification.permission = permission;
                    }
                });
            }
            if (Notification.permission === 'granted') {
                new Notification('Pin 6 Green Led', {
                    body : 'Pin state: ' + data
                });
            }
        });
        $.get( url_red_digital, function( data ) { 
            if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if(!('permission' in Notification)) {
                        Notification.permission = permission;
                    }
                });
            }
            if (Notification.permission === 'granted') {
                new Notification('Pin 3 Red Led', {
                    body : 'Pin state: ' + data
                });
            }
        });
    });
    
    function check_bool(data) {
        if(data !== '0' ) {
            return true;
        } else {
            return false;
        }
    }
});