//= http://code.jquery.com/jquery-1.6.2.js

//= deck.js!core/deck.core
//= deck.js!extensions/hash/deck.hash.js
//= deck.js!extensions/status/deck.status.js
// deck.js!extensions/scale/deck.scale.js
// deckmirror!deck.codemirror.js

//= keymaster!
//= underscore!

//= deck.js!modernizr.custom.js

DECKEM = (function() {
    
    /* internals */
    
    function initSlide(slide) {
        var bgImage = slide.data('bg');
        if (bgImage) {
            slide
                .css('background-image', 'url(' + bgImage + ')')
                .css('background-size', '100% 100%');
        } // if
    } // initSlide
    
    /* intialization */
    
    $(document).bind('deck.init', function(evt) {
        _.each($.deck('getSlides'), initSlide);
    });

    $(document).bind('deck.change', function(evt, from, to) {
        $.deck('getSlide', to).each(function() {
        });
    });
})();

