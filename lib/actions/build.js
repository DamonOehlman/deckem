var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    jade = require('jade'),
    ncp = require('ncp').ncp,
    _ = require('underscore'),
    reDeckFile = /^deck/i;
    
function compile(builder, deckPath, template, opts, callback) {
    var outputFile = path.join(deckPath, 'index.html'),
        targetFile = path.join(deckPath, 'deck.jade');
    
    fs.readFile(targetFile, 'utf8', function(err, data) {
        if (! err) {
            var deck = jade.compile(data, {
                    filename: targetFile
                }),
                deckContent = deck(opts),
                templateOutput = template(_.extend({
                    deck: deckContent,
                    title: 'Untitled Deck'
                }, opts));
            
            fs.writeFile(outputFile, templateOutput);
        } // if
        
        callback();
    });
} // compile

function findDecks(builder, targetPath, config, callback) {
    var subdirs = [],
        decks = [],
        isDeck = false,
        configFile = path.join(targetPath, 'deck.json'),
        childConfig = _.extend({}, config, { 
            clientpath: getClientPath(targetPath, config.basePath)
        }),
        key;
        
    function checkPath(file, callback) {
        var testPath = path.join(targetPath, file);
        
        fs.stat(testPath, function(statErr, stats) {
            if (statErr) {
                callback(statErr);
            }
            else if (stats.isDirectory()) {
                findDecks(builder, testPath, childConfig, function(childDecks) {
                    decks = decks.concat(childDecks);
                    callback(null);
                });
            }
            else {
                isDeck = isDeck || reDeckFile.test(file);
                callback(null);
            } // if..else
        });
    } // checkPath
    
    // attempt to read a configuration file
    fs.readFile(configFile, 'utf8', function(err, data) {
        // if we read the configuration successfully, then update the config
        if (! err) {
            try {
                _.extend(childConfig, JSON.parse(data));
            }
            catch (e) {
                builder.out('!{red}Error parsing deck config @ {0}', configFile);
            } // try..catch
        } // if
        
        // read the contents of the directory
        fs.readdir(targetPath, function(err, files) {
            if (err) {
                callback();
            }
            else {
                async.forEach(files, checkPath, function(err) {
                    if (isDeck) {
                        decks.unshift({
                            path: targetPath,
                            config: childConfig
                        });
                    } // if

                    callback(decks);
                });
            } // if..else
        });
    });
} // findDecks

function getClientPath(targetPath, basePath) {
    var clientPath = '';
    
    while (targetPath.length > basePath.length) {
        clientPath = clientPath + '../';
        targetPath = path.dirname(targetPath);
    } // while
    
    return clientPath;
} // getClientPath

function loadTemplate(templatePath, callback) {
    var layoutFile = path.join(templatePath, 'layout.jade');
    
    fs.readFile(layoutFile, 'utf8', function(err, data) {
        if (err) {
            throw new Error('Unable to load template from path: ' + templatePath);
        } // if
        
        callback(jade.compile(data, {
            filename: layoutFile
        }));
    });
} // loadTemplate

module.exports = function(opts, callback) {
    var templatePath = this.getAssetPath('templates/' + this.template),
        builder = this;
        
    path.exists(templatePath, function(exists) {
        if (! exists) {
            templatePath = builder.getAssetPath('templates/default');
        } // if
        
        loadTemplate(templatePath, function(template) {
            builder.out('Template loaded from: !{underline}{0}', templatePath);
            
            findDecks(builder, builder.targetPath, { basePath: builder.targetPath }, function(decks) {
                // copy the client files to the root build path
                ncp(builder.getAssetPath('client'), builder.targetPath, callback);
                
                // compile each of the decks
                async.forEach(
                    decks, 
                    function(deck, compileCallback) {
                        compile(builder, deck.path, template, deck.config, compileCallback);
                    },
                    function(err) {
                        
                    }
                );
            });
        });
    });
};