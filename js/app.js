$( document ).ready(function() {
    var url_green_analog, url_green_digital, url_red_analog, url_red_digital;
    
    //Get ip saved
    localforage.getItem('ip', function(err, value) {
        if( value !== null && value !== '' ) {
            $( ".ip" ).val( value );
            path( $( ".ip" ).val() );
        } else {
            $( ".ip" ).val('192.168.240.1');
            path( $( ".ip" ).val() );
        }
    });
    
    //Save the ip on change
    $( ".ip" ).change(function() {
        localStorage.setItem( 'ip', $( this ).val());
        path( $(this).val() );
    });
    
    //Set the state of checkbox for Green led
    $.ajax({
        url: url_green_digital,
        xhrFields: {
            mozAnon: true,
            mozSystem: true
        }
    }).done(function( data ) {
        $( '.led-green' ).attr( 'checked', check_bool(data));
        $( '.led-green' ).click(function() {
            if( $( this ).is( ':checked' ) )  {
                url_green = url_green_analog + '200';
            } else {
                url_green = url_green_analog + '0';
            }
            $.ajax({
                url: url_green,
                xhrFields: {
                    mozAnon: true,
                    mozSystem: true
                }
            });
        });
    });
    
    //Set the state of checkbox for Red led
    $.ajax({
        url: url_red_digital,
        xhrFields: {
            mozAnon: true,
            mozSystem: true
        }
    }).done(function( data ) {
        $( '.led-red' ).attr( 'checked', check_bool(data));
        $( '.led-red' ).click(function() {
            if($(this).is(':checked'))  {
                url_red = url_red_analog + '200';
            } else {
                url_red = url_red_analog + '0';
            }
            $.ajax({
                url: url_red,
                xhrFields: {
                    mozAnon: true,
                    mozSystem: true
                }
            });
        });
    });
    
    //Notification
    $('.notification').click(function() {
        $.ajax({
            url: url_green_digital,
            xhrFields: {
                mozAnon: true,
                mozSystem: true
            }
        }).done(function( data ) {
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
        $.ajax({
            url: url_red_digital,
            xhrFields: {
                mozAnon: true,
                mozSystem: true
            }
        }).done(function( data ) {
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
        //Digital for the state
        url_green_digital = 'http://' + ip + '/arduino/digital/6/';
        url_red_digital = 'http://' + ip + '/arduino/digital/3/';
        //Analog for change the value
        url_red_analog = 'http://' + ip + '/arduino/analog/3/';
        url_green_analog = 'http://' + ip + '/arduino/analog/6/';
    }
});
