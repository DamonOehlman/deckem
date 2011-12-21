var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    rePathDeckem = /^(.*?\/deckem)\/?.*$/i,
    testPath = process.cwd().replace(rePathDeckem, '$1/test/testdeck'),
    testOpts = {
        path: testPath
    },
    suite = vows.describe('Deckem Tests'),
    builder = require('scaffolder').create(path.resolve(__dirname, '../'), testOpts);
    
builder.once('ready', function(action) {
    /*
    suite.addBatch({
        'Deck Creation': {
            topic: function() {
                builder.create(testOpts, this.callback);
            },
            
            'deck file created': function(err) {
                assert.ok(! err);
                assert.ok(path.existsSync(path.join(testPath, 'deck.jade')), 'deck.jade does not exist');
            }
        }
    });
    */
    
    suite.addBatch({
        'Deck Build': {
            topic: function() {
                builder.build(this.callback);
            },
            
            'deck output file exists': function() {
                
            }
        }
    });
    
    suite.run();
});