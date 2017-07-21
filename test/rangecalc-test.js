var assert = require('assert');
var ipaddr = require('ipaddr.js');
var rangecalc = require('../lib/rangecalc');

describe('Rangecalc', function() {

  describe('IPv4', function() {

    it('should return the proper range', function() {
      var start = ipaddr.parse('192.168.0.1');
      var end = ipaddr.parse('192.168.0.254');
      assert(rangecalc.getCIDR(start, end) == 24);
    });

    it('should return 32 when the IP addresses are identical', function() {
      var start = ipaddr.parse('192.168.0.1');
      var end = start;
      assert(rangecalc.getCIDR(start, end) == 32);
    });

    it('should return the right integer representation', function() {
      var ip = ipaddr.parse('192.168.0.1');
      assert(rangecalc.toInt(ip) == 3232235521);
    });

    it('should order the addresses properly', function() {
      var arr = [ipaddr.parse('192.168.0.1'), ipaddr.parse('192.168.0.254'), ipaddr.parse('192.168.0.50')]
      var sortedArr = rangecalc.sort(arr);
      assert(sortedArr[2].toString() == '192.168.0.254');
    });
  });

  describe('IPv6', function() {

    it('should return the proper range', function() {
      var start = ipaddr.parse('2001:4860:4860::8844');
      var end = ipaddr.parse('2001:4860:4860::8888');
      assert(rangecalc.getCIDR(start, end) == 120);
    });

    it('should return the right integer representation', function() {
      var ip = ipaddr.parse('2001:4860:4860::8888');
      assert(rangecalc.toInt(ip) == 42541956123769884636017138956568135816);
    });
  });
});
