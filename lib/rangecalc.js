const ipaddr = require('ipaddr.js');
const Address6 = require('ip-address').Address6;

var self = module.exports = {

  getCIDR: function(start, end) {
    if (start instanceof Address6) {
      // IPv6
      var startBigInt = start.bigInteger();
      var endBigInt = end.bigInteger();
      return 0;
    } else {
      var startInt = self.toInt(start);
      var endInt = self.toInt(end);
      var binaryXOR = startInt ^ endInt;
      if (binaryXOR == 0) {
        return 32;
      } else {
        var binaryStr = binaryXOR.toString(2);
        var zeroCount = binaryStr.split("0").length - 1;
        var oneCount = binaryStr.split("1").length - 1;
        return 32 - (zeroCount + oneCount);
      }
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
  },

  sort: function(arr) {
    if (arr[0] instanceof Address6) {
      arr.sort(function(a, b) { return a.bigInteger().compareTo(b.bigInteger()) });
    } else {
      arr.sort(function(a, b) { return self.toInt(a) - self.toInt(b) });
    }
    return arr;
  }

}
