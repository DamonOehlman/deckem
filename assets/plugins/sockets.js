DECKEM.Sockets = (function() {
    
    var reSock = /^sock\:.*$/i;

    /* exports */

    function connect(server) {
        if (typeof io != 'undefined') {
            console.log('attempting connection to: ' + server);
            
            var socket = io.connect(server);
            socket.on('connect', function() {
                eve.on('deck.*', function() {
                    // get the last argument
                    var lastArg = arguments.length ? arguments[arguments.length - 1] : null;
                    
                    // if the last arg is a socket connection, then don't send it to the serve
                    // because we got it from the server...
                    if ((! lastArg) || (! reSock.test(lastArg))) {
                        socket.emit.apply(socket, ['event', eve.nt()].concat(Array.prototype.slice.call(arguments, 0)));
                    } // if
                });
                
                socket.on('event', function(evtName) {
                    eve.apply(eve, [evtName, DECKEM].concat(Array.prototype.slice.call(arguments, 1)));
                });
            });
        }
    } // connext
    
    return {
        connect: connect
    };
})();