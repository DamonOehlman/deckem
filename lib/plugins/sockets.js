var fs = require('fs'),
    reTrailingSlash = /\/$/;

module.exports = function(builder, opts, callback) {
    // initialise options
    opts = opts || {};

    // initialise the server to the default shared deckem server (which doesn't exist, btw)
    opts.server = (opts.server || 'http://deckem.com').replace(reTrailingSlash, '');

    // tell the server to load the remote sockets file
    callback(null, [opts.server + '/sockets.js']);
};