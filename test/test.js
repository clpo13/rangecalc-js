var assert = require('assert');
var ipaddr = require('ipaddr.js');
var rangecalc = require('../bin/rangecalc');

describe('Rangecalc', function() {
  it('should return the proper range', function() {
    var start = ipaddr.parse("192.168.0.1");
    var end = ipaddr.parse("192.168.0.254");
    assert(rangecalc.getCIDR(start, end) == 24);
  });

  it('should return the right integer representation', function() {
    var ip = ipaddr.parse("192.168.0.1");
    assert(rangecalc.toInt(ip) == 3232235521);
  });
});
