var interleave = require('interleave'),
    fs = require('fs'),
    config = {
        aliases: {
            'deck.js': 'github://imakewebthings/deck.js/$1?v=stable',
            'deckmirror': 'github://iros/deck.js-codemirror/$1',
            'keymaster': 'github://madrobby/keymaster/keymaster.js'
        }
    };

// build each of the builds
interleave('src', {
    multi: 'pass',
    path: 'assets/client',
    config: config
});

// build each of the themse
interleave('src/themes', {
    multi: 'pass',
    path: 'assets/client/themes',
    config: config
});