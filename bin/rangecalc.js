#!/usr/bin/env node

var ipaddr = require('ipaddr.js');

var self = module.exports = {

  getCIDR: function(start, end) {
    var startInt = self.toInt(start);
    var endInt = self.toInt(end);
    console.log(startInt);
    console.log(endInt);
    var binaryXOR = startInt ^ endInt;
    if (binaryXOR == 0) {
      return 32;
    } else {
      var binaryStr = binaryXOR.toString(2);
      var zeroCount = binaryStr.split("0").length - 1;
      var oneCount = binaryStr.split("1").length - 1;
      return 32 - (zeroCount + oneCount);
    }
  },

  toInt: function(addr) {
    var arr = addr.octets;
    var ipInt = 0;
    var counter = 3;
    for (var i in arr) {
      ipInt += arr[i] * Math.pow(256, counter);
      counter--;
    }
    return ipInt;
  }

}
