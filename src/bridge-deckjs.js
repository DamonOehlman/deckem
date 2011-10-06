$(function() {
    var socketHandler;
    
    $.deck('.slide');
    
    function relayEvents(evt, from, to) {
        eve('deck.goto', null, to);
    } // relayEvents
    
    eve.on('socket.connect', function(socket) {
        socketHandler = eveRemote('deck', socket, socketHandler);
    });
    
    eve.on('deck.goto', function(index, remote) {
        if (remote) {
            $(document).unbind('deck.change');
            $.deck('go', parseInt(index, 10));
            $(document).bind('deck.change', relayEvents);
        } // if
    });
    
    $(document).bind('deck.change', relayEvents);
});