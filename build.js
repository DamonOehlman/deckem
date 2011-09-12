var interleave = require('interleave'),
    fs = require('fs'),
    config = {
        aliases: {
            'deck.js': 'github://imakewebthings/deck.js/$1?v=stable'
        }
    };

// build each of the builds
interleave('src', {
    multi: 'pass',
    path: 'assets/client',
    config: config
});