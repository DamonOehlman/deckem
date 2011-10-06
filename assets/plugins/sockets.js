DECKEM.Sockets = (function() {
    
    /* exports */

    function connect(server) {
        if (typeof io != 'undefined') {
            console.log('attempting connection to: ' + server);
            
            var socket = io.connect(server);
            socket.on('connect', function() {
                eve('socket.connect', null, socket);
                
                socket.on('event', function(evtName) {
                    eve.apply(eve, [evtName, null].concat(Array.prototype.slice.call(arguments, 1)));
                });
            });
        }
    } // connext
    
    return {
        connect: connect
    };
})();