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

//= eve-remote!

DECKEM = (function() {
    
    /* internals */
    
    var currentSlide,
        frameRemoter,
        reLogEvents = /^logger\.(.*)$/i;
        
    function getAvailableHeight() {
        if (currentSlide) {
            var totalHeight = 0;
            
            currentSlide.children().each(function() {
                totalHeight += $(this).height();
            });
            
            return currentSlide.height() - totalHeight;
        } // if
        
        return 0;
    } // getAvailableHeight
    
    function initSlide(slide) {
        var bgImage = slide.data('bg');
        if (bgImage) {
            slide
                .css('background-image', 'url(' + bgImage + ')')
                .css('background-size', '100% 100%');
        } // if
    } // initSlide
    
    function makeTrigger(eventName) {
        return function() {
            eve.apply(eve, [eventName, null].concat(Array.prototype.slice.call(arguments, 0)));
        };
    } // makeTrigger
    
    /* intialization */
    
    $(document).bind('deck.init', function(evt) {
        _.each($.deck('getSlides'), initSlide);
    });

    $(document).bind('deck.change', function(evt, from, to) {
        var frames = [];
        
        currentSlide = $.deck('getSlide', to);
        
        $('iframe', currentSlide).each(function() {
            frames.push(this.contentWindow);
        });
        
        frameRemoter = eveRemote('*', frames, frameRemoter);
        
        // add the logger to the current slide
        $('.logger', currentSlide).remove();
    });

    // handle logger messages
    eve.on('logger', function() {
        var eventName = eve.nt().replace(reLogEvents, '$1'),
            logItems = [];
        
        if (currentSlide) {
            $('.logger', currentSlide).remove();
            
            for (var ii = 0; ii < arguments.length; ii++) {
                logItems.push('<li>' + JSON.stringify(arguments[ii]) + '</li>');
            } // for
            
            currentSlide.append(
                '<div class="logger"><h4>' + eventName + '</h4>' + 
                '<ul>' + logItems.join('') + '</ul>' + 
                '</div>'
            );
            
            $('.logger', currentSlide).height(getAvailableHeight()).addClass('active');
        } // if
    });
    
    // map keys
    key('⌘+/, ctrl+/', makeTrigger('run'));
    
    return {};
})();

