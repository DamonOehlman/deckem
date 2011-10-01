var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    rePathDeckem = /^(.*?\/deckem)\/?.*$/i,
    testPath = process.cwd().replace(rePathDeckem, '$1/test/testdeck'),
    testOpts = {
        path: testPath
    },
    suite = vows.describe('Deckem Tests');
    
require('scaffolder').create(path.resolve(__dirname, '../'), function(builder, action) {
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
    
    suite.addBatch({
        'Deck Build': {
            topic: function() {
                builder.build(testOpts, this.callback);
            },
            
            'deck output file exists': function() {
                
            }
        }
    });
    
    suite.run();
}, testOpts);