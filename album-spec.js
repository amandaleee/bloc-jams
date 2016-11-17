'use strict';




var expect = require('chai').expect;



global.window = window;
global.$ = require('jquery');



describe('album', function() {
  it('should exist', function() {
    var album = require('./scripts/album.js');
    expect(album).to.not.be.undefined;
  });
});