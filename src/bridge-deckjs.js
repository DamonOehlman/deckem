$(function() {
    $.deck('.slide');
    
    function relayEvents(evt, from, to) {
        eve('deck.goto', DECKEM, to);
    } // relayEvents
    
    eve.on('deck.goto', function(index, remote) {
        if (remote) {
            $(document).unbind('deck.change');
            $.deck('go', index);
            $(document).bind('deck.change', relayEvents);
        } // if
    });
    
    $(document).bind('deck.change', relayEvents);
});