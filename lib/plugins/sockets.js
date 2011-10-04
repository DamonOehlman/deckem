var fs = require('fs'),
    reTrailingSlash = /\/$/;

module.exports = function(builder, opts, callback) {
    // initialise options
    opts = opts || {};

    // initialise the server to the default shared deckem server (which doesn't exist, btw)
    opts.server = (opts.server || 'http://deckem.com').replace(reTrailingSlash, '');
    
    // load the sockets plugin text
    fs.readFile(builder.getAssetPath('plugins/sockets.js'), 'utf8', function(err, data) {
        if (! err) {
            callback([data, 'DECKEM.Sockets.connect(\'' + opts.server + '\')'], opts.server + '/socket.io/socket.io.js');
        }
        else {
            callback();
        } // if..else
    });
};