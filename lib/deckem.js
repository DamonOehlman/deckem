var events = require('events'),
    util = require('util'),
    path = require('path'),
    fs = require('fs'),
    optDefaults = {
        title: 'Untitled presentation',
        template: 'default'
    };

var DeckBuilder = exports.DeckBuilder = function(opts) {
    // initialise options
    opts = opts || {};
    
    // initialise members
    this.targetPath = opts.path || path.resolve('.');
    this.assetPath = path.resolve(__dirname, '../assets');
    this.out = opts.out || require('out');

    var builder = this;
    this.loadConfig(opts, function() {
        builder.emit('ready');
    });
}; // DeckBuilder

util.inherits(DeckBuilder, events.EventEmitter);

DeckBuilder.prototype.getAssetPath = function(asset) {
    return path.join(this.assetPath, asset || '');
}; // getAssetPath

DeckBuilder.prototype.loadActions = function(opts, callback) {
    var builder = this;
    
    fs.readdir(path.resolve(__dirname, 'actions'), function(err, files) {
        // iterate through the files found
        files.forEach(function(file) {
            var actionName = path.basename(file, '.js');
            
            // add the action to the builder
            builder[actionName] = require('./actions/' + actionName);
        });
        
        // fire the callback
        if (callback) {
            callback();
        } // if
    });
};

DeckBuilder.prototype.loadConfig = function(opts, callback) {
    var configFile = path.resolve(this.targetPath, 'config.json'),
        builder = this;
    
    fs.readFile(configFile, 'utf8', function(err, data) {
        var config = {};
        
        if (! err) {
            try {
                config = JSON.parse(data);
            }
            catch (e) {
                console.warn('invalid config file: ' + configFile);
            } // try..catch
        } // if
        
        // initialise the options
        for (var key in optDefaults) {
            builder[key] = opts[key] || config[key] || optDefaults[key];
        } // for

        // load the actions
        builder.loadActions(opts, callback);
    });
};
