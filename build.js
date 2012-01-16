var interleave = require('interleave'),
    fs = require('fs'),
    config = {
        aliases: {
            'eve': 'github://DmitryBaranovskiy/eve/eve.js',
            'eve-remote': '/development/projects/DamonOehlman/eve-remote/eve-remote.js',
            'deck.js': '../deck.js/$1', // 'github://imakewebthings/deck.js/$1?v=stable',
            'deckmirror': 'github://iros/deck.js-codemirror/$1',
            'keymaster': 'github://madrobby/keymaster/keymaster.js',
            'underscore': 'github://documentcloud/underscore/underscore.js?v=1.1.7'
        }
    };

// build each of the builds
interleave('src', {
    path: 'assets/client',
    config: config
});

/*

interleave('src/plugins', {
    multi: 'pass', 
    path: 'assets/plugins',
    config: config
});

*/

// build each of the themse
interleave('src/themes', {
    path: 'assets/client/themes',
    config: config
});