const ipaddr = require('ipaddr.js');

var self = module.exports = {

  /**
   * Calculate the CIDR range of two IP addresses.
   * @param {IPv4} start the first IP address in a set
   * @param {IPv4} end the last IP address in a set
   * @returns {number} the CIDR range that includes both addresses
   */
  getCIDR: function(start, end) {
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
  },

  /**
   * Calculate an integer representation of an IP address.
   * @param {IPv4} addr an IP address object
   * @returns {number} the IP address in integer form
   */
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

  /**
   * Sort an array of IP addresses by converting them to integers.
   * @param {Array} arr an array of IP addresses
   * @returns {Array} the array sorted numerically
   */
  sort: function(arr) {
    arr.sort(function(a, b) { return self.toInt(a) - self.toInt(b) });
    return arr;
  }
}
