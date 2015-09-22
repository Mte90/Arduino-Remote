$( document ).ready(function() {
    var url_green_analog, url_green_digital, url_red_analog, url_red_digital;
    //Get ip saved
    if(localStorage.getItem('ip') !== '') {
        $( ".ip" ).val(localStorage.getItem('ip'));
        path($( ".ip" ).val());
    }
    //Save the ip on change
    $( ".ip" ).change(function() {
        localStorage.setItem('ip', $(this).val());
        path($(this).val());
    });
    //Set the state of checkbox for Green led
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
    //Set the state of checkbox for Red led
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
    //Notification
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
    //Cute function for check the value on the rest server
    function check_bool(data) {
        if(data !== '0' ) {
            return true;
        } else {
            return false;
        }
    }
    //Set the path
    function path(ip) {
        url_green_analog = 'http://' + ip + '/arduino/analog/6/';
        url_green_digital = 'http://' + ip + '/arduino/digital/6/';
        url_red_analog = 'http://' + ip + '/arduino/analog/3/';
        url_red_digital = 'http://' + ip + '/arduino/digital/3/';
    }
});
