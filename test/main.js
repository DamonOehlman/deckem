var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    DeckBuilder = require('../lib/deckem').DeckBuilder,
    rePathDeckem = /^(.*?\/deckem)\/?.*$/i,
    testPath = process.cwd().replace(rePathDeckem, '$1/test/testdeck'),
    testOpts = {
        path: testPath,
        out: function() {}
    },
    builder = new DeckBuilder(testOpts);
    suite = vows.describe('Deckem Tests');
    
builder.on('ready', function() {
    suite.addBatch({
        'Deck Creation': {
            topic: function() {
                builder.create(testOpts, this.callback);
            },
            
            'deck file created': function(err) {
                assert.ok(! err);
                assert.ok(path.existsSync(path.join(testPath, 'main.jade')), 'main.jade does not exist');
            }
        }
    });
    
    suite.run();
});

