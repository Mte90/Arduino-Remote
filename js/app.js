$(document).ready(function() {
    var url_digital;

    //Get ip saved
    localforage.getItem('ip', function(err, value) {
        if( value !== null && value !== '' ) {
            $( '.ip' ).val(value);
            path();
        } else {
            $( '.ip' ).val('192.168.0.43');
            localforage.setItem('ip', $( '.ip' ).val());
            path();
        }
    })

    //Get saved custom number
    localforage.getItem('led-number', function(err, value) {
        if( value !== null && value !== '' ) {
            $( '.led-number' ).val( value );
            $( '.led-container span' ).html( value );
            init_pin();
        } else {
            $( '.led-number' ).val( '3' );
            $( '.led-container span' ).html( 3 );
            init_pin();
        }
    });

    //Save the ip on change
    $( '.ip' ).change(function() {
        localforage.setItem( 'ip', $( this ).val());
        path();
        init_pin();
    });

    // Save the custom number on change
    $('.led-number').change(function() {
        localforage.setItem( 'led-number', $( this ).val());
        $( '.led-container span' ).html( $( this ).val() );
        path();
        init_pin();
    });
    
    //Notification
    $('.notification').click(function() {
        $.ajax({
            url: url_digital,
            dataType: 'json',
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
                new Notification('Pin ' + $( '.led-number' ).val() +  ' Led', {
                    body : 'Pin state: ' + data.return_value
                });
            }
        });
    });

    //Control the custom led
    $( '.led-custom' ).click(function() {
        var url;
        if( $(this).is( ':checked' ) )  {
            url = url_digital + '/1';
        } else {
            url = url_digital + '/0';
        }
        $.ajax({
            url: url,
            xhrFields: {
                mozAnon: true,
                mozSystem: true
            }
        });
    });
    //Set the path

    // set the URL for the ON/OFF GET request
    function path() {
        ip = $( '.ip' ).val();
        pin = $( '.led-number' ).val();
        url_digital = 'http://' + ip + '/arduino/digital/' + pin;
    }

    // set OUTPUT mode for the selected pin
    function init_pin() {
        ip = $( '.ip' ).val();
        pin = $( '.led-number' ).val();
        $.ajax({
            url: 'http://' + ip + '/arduino/mode/' + pin + '/o',
            xhrFields: {
                mozAnon: true,
                mozSystem: true
            }
        });
    }
});
