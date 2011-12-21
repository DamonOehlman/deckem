//= http://code.jquery.com/jquery-1.6.2.js

//= deck.js!core/deck.core
//= deck.js!extensions/hash/deck.hash.js
//= deck.js!extensions/status/deck.status.js

//= eve!
//= keymaster!
//= underscore!
//= deps/prettify.js

//= deck.js!modernizr.custom.js

//= eve-remote!

DECKEM = (function() {
    
    /* internals */
    
    var currentSlide,
        frameRemoter,
        reLogEvents = /^logger\.(.*)$/i,
        reTrailingUrlParts = /^(.*\/).*$/,
        reRemote = /^remote/i;
        
    function getAvailableHeight(targetElement) {
        targetElement = targetElement || currentSlide;
        
        if (targetElement) {
            var totalHeight = 0;
            
            $(targetElement).children().each(function() {
                if (! $(this).hasClass('autoheight')) {
                    totalHeight += $(this).height();
                } // if
            });
            
            return $(targetElement).height() - totalHeight;
        } // if
        
        return 0;
    } // getAvailableHeight
    
    function getDeckInfo() {
        return {
            published: $('body').hasClass('published'),
            url: document.location.href.replace(reTrailingUrlParts, '$1'),
            title: document.title
        };
    } // getDeckInfo
    
    function initSlide(slide) {
        var bgImage = slide.data('bg');
        if (bgImage) {
            slide.css('background-image', 'url(' + bgImage + ')');
                // .css('background-size', '100% 100%');
        } // if
    } // initSlide
    
    function addIFrame(targetElement, data) {
        var iframe = $('iframe[src="' + data.url + '"]', targetElement);
        
        if (iframe.length === 0) {
            // determine the available height
            var availHeight = getAvailableHeight(targetElement) - 40;
            
            // add the iframe
            $(targetElement).append(
                '<div class="drop-shadow lifted ext-container" style="margin-top: 15px; height: ' + availHeight + 'px;">' +
                '<iframe scrolling="no" src="' + data.url + '" style="height: 100%"/>' +
                '</div>'
            );
        } // if
    } // makeIFrame
    
    function makeTrigger(eventName) {
        return function() {
            eve.apply(eve, [eventName, null].concat(Array.prototype.slice.call(arguments, 0)));
        };
    } // makeTrigger

    function toggleFullWidth() {
        $('body').toggleClass('fullwidth');
    } // toggleFullWidth
    
    function togglePublished() {
        $('body').toggleClass('published');
        eve('deck.publish', null, getDeckInfo());
    } // togglePublished
    
    function toggleSpeakerMode() {
        $('body').toggleClass('speakermode');
    } // toggleSpeakerMode
    
    /* exports */
    
    function checkSlide(targetElement) {
        if (! targetElement) { return false; }
        
        var dataset = targetElement.dataset || {};

        // if we have a url element, then process
        if (dataset.url) {
            addIFrame(targetElement, dataset);
        } // if
        
        return false;
    } // checkSlide
    
    /* intialization */
    
    $(document).bind('deck.init', function(evt) {
        _.each($.deck('getSlides'), initSlide);
    });

    $(document).bind('deck.change', function(evt, from, to) {
        var frames = [];
        
        currentSlide = $.deck('getSlide', to)[0];
        
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
                if (! reRemote.test(arguments[ii])) {
                    logItems.push('<li><pre class="prettyprint lang-js">' + stringify(arguments[ii]) + '</pre></li>');
                } // if
            } // for
            
            $(currentSlide).append(
                '<div class="logger"><h4>' + eventName + '</h4>' + 
                '<ul>' + logItems.join('') + '</ul>' + 
                '</div>'
            );
            
            $('.logger', currentSlide).height(getAvailableHeight()).addClass('active');
            prettyPrint();
        } // if
    });
    
    // map keys
    key('⌘+/, ctrl+/', makeTrigger('run'));
    key('⌘+., ctrl+.', toggleFullWidth);
    key('ctrl+shift+s', toggleSpeakerMode);
    key('ctrl+shift+p', togglePublished);
    key('escape', makeTrigger('escape'));
    
    
    return {
        checkSlide: checkSlide
    };
})();

