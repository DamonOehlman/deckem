var path = require('path'),
    fs = require('fs'),
    reDeckFile = /^deck/i;

module.exports = function(opts, extraArgs, callback) {
    callback = callback || function() {};
    
    var builder = this;
    
    fs.readdir(this.targetPath, function(err, files) {
        var deckExists = false;
        
        if (err) {
            builder.out('!{red}Unable to scaffold deck: {0} not found', builder.targetPath);
            callback(err);
        } // if
        
        files.forEach(function(file) {
            deckExists = deckExists || reDeckFile.test(file);
        });
        
        // if the deck already exists, then report an error
        if (deckExists) {
            builder.out('!{red}Unable to create: deck already created in {0}', builder.targetPath);
            callback('deck already exists');
        }
        else {
            builder.copyAssets('scaffold', callback);
        } // if..else
    });
};