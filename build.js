var interleave = require('interleave'),
    fs = require('fs'),
    aliases = {
        'eve': 'github://DmitryBaranovskiy/eve/eve.js',
        'eve-remote': '/development/projects/DamonOehlman/eve-remote/eve-remote.js',
        'deck.js': 'github://imakewebthings/deck.js/',
        'deckmirror': 'github://iros/deck.js-codemirror/',
        'keymaster': 'github://madrobby/keymaster/keymaster.js',
        'underscore': 'github://documentcloud/underscore/underscore.js?v=1.1.7'
    };

// build each of the builds
interleave('src', {
    path: 'assets/client',
    aliases: aliases
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
    aliases: aliases
});