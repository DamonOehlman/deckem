var fs = require('fs'),
    path = require('path'),
    jade = require('jade');
    
function compile(builder, targetFile, template, opts, callback) {
    var outputFile = path.join(path.dirname(targetFile), 'main.html');
    
    fs.readFile(targetFile, 'utf8', function(err, data) {
        if (! err) {
            var deck = jade.compile(data, {
                    filename: targetFile
                }),
                deckContent = deck(opts);
            
            fs.writeFile(outputFile, template({
                deck: deckContent,
                title: builder.title
            }));
        } // if
        
        if (callback) {
            callback();
        } // if
    });
} // compile

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

            // walk through subdirectories
            compile(builder, path.join(builder.targetPath, 'main.jade'), template, opts, callback);
        });
    });
};