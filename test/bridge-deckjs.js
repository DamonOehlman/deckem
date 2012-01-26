$(function() {
    var socketHandler,
        published = false;
    
    $.deck('.slide');
    
    function relayEvents(evt, from, to) {
        if (published) {
            eve('deck.goto', null, to);
        } // if
    } // relayEvents
    
    eve.on('socketio.connect', function(socket) {
        socketHandler = eveRemote('deck', socket, socketHandler);
    });
    
    eve.on('deck.publish', function(pub) {
        published = pub;
    });
    
    eve.on('deck.goto', function(index, remote) {
        if (remote) {
            $(document).unbind('deck.change', relayEvents);
            $.deck('go', parseInt(index, 10));
            $(document).bind('deck.change', relayEvents);
        } // if
    });
    
    $(document)
        .bind('deck.change', relayEvents)
        .bind('deck.change', function(evt, from, to) {
            if (DECKEM.checkSlide($.deck('getSlide', to)[0])) {
            } // if
        });

});