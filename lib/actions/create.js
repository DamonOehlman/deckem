var path = require('path'),
    ncp = require('ncp').ncp;

module.exports = function(opts, callback) {
    var deckMain = path.resolve(this.targetPath, 'deck.jade'),
        builder = this;
    
    // check for the main.jade file
    path.exists(deckMain, function(exists) {
        if (exists) {
            builder.out('!{red}Unable to create: {0} already exists', deckMain);
            if (callback) {
                callback(deckMain + ' already exists');
            } // if
        }
        else {
            ncp(builder.getAssetPath('scaffold'), builder.targetPath, callback);
        } // if..else
    });
};