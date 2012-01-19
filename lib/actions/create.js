var path = require('path'),
    fs = require('fs'),
    reDeckFile = /^deck/i,
    out = require('out');

module.exports = function(opts, callback) {
    callback = callback || function() {};
    
    var repl = this,
        targetPath = process.cwd();
    
    fs.readdir(targetPath, function(err, files) {
        var deckExists = false;
        
        if (err) {
            out('!{red}Unable to scaffold deck: {0} not found', targetPath);
            callback(err);
        } // if
        
        files.forEach(function(file) {
            deckExists = deckExists || reDeckFile.test(file);
        });
        
        // if the deck already exists, then report an error
        if (deckExists) {
            out('!{red}Unable to create: deck already created in {0}', targetPath);
            callback('deck already exists');
        }
        else {
            repl.generator.copy('assets/scaffold', targetPath, callback);
        } // if..else
    });
};