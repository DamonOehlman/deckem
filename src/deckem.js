//= http://code.jquery.com/jquery-1.6.2.js

//= deck.js!core/deck.core
//= deck.js!extensions/hash/deck.hash.js
//= deck.js!extensions/status/deck.status.js
// deck.js!extensions/scale/deck.scale.js
// deckmirror!deck.codemirror.js

//= eve!
//= keymaster!
//= underscore!

//= deck.js!modernizr.custom.js

DECKEM = (function() {
    
    /* internals */
    
    var slideFrames;
    
    function initSlide(slide) {
        var bgImage = slide.data('bg');
        if (bgImage) {
            slide
                .css('background-image', 'url(' + bgImage + ')')
                .css('background-size', '100% 100%');
        } // if
    } // initSlide
    
    function makeTrigger() {
        var evtArgs = Array.prototype.slice.call(arguments, 0);
        
        return function() {
            eve.apply(eve, evtArgs);
        };
    } // makeTrigger
    
    function mapMessageToEve(evt) {
        
    } // mapMessageToEve
    
    /* intialization */
    
    $(document).bind('deck.init', function(evt) {
        _.each($.deck('getSlides'), initSlide);
    });

    $(document).bind('deck.change', function(evt, from, to) {
        slideFrames = $.deck('getSlide', to).find('iframe');
    });

    // route messages to eve
    window.addEventListener('message', mapMessageToEve, false);
    
    // map all eve events to the childframes
    eve.on('*', function() {
        var message;
        
        if (slideFrames.length) {
            message = JSON.stringify({
                name: eve.nt(),
                args: Array.prototype.slice(arguments, 0)
            });
        } // if
        
        console.log('captured event: ' + eve.nt());
        console.log(message);
        
        slideFrames.each(function() {
            this.contentWindow.postMessage(message, '*');
        });
    });
    
    // map keys
    key('⌘+/, ctrl+/', makeTrigger('run'));
    
    return {};
})();

