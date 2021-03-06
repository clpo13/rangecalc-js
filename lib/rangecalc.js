// rangecalc - get the CIDR range of a set of IP addresses
// Copyright (C) 2017–2019 Cody Logan
// SPDX-License-Identifier: GPL-3.0-or-later
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const ipaddr = require('ipaddr.js')

const self = module.exports = {

  /**
   * Calculate the CIDR range of two IP addresses.
   * @param {string} start the first IP address in a set
   * @param {string} end the last IP address in a set
   * @returns {number} the CIDR range that includes both addresses
   */
  getCIDR: function (start, end) {
    const startInt = self.toInt(start)
    const endInt = self.toInt(end)
    const binaryXOR = startInt ^ endInt
    if (binaryXOR === 0) {
      return 32
    } else {
      const binaryStr = binaryXOR.toString(2)
      const zeroCount = binaryStr.split('0').length - 1
      const oneCount = binaryStr.split('1').length - 1
      return 32 - (zeroCount + oneCount)
    }
  },

  /**
   * Calculate an integer representation of an IP address.
   * @param {string} addr an IP address
   * @returns {number} the IP address in integer form
   */
  toInt: function (addr) {
    const ip = ipaddr.parse(addr)
    const arr = ip.octets
    let ipInt = 0
    let counter = 3
    for (const i in arr) {
      ipInt += arr[i] * Math.pow(256, counter)
      counter--
    }
    return ipInt
  },

  /**
   * Sort an array of IP addresses by converting them to integers.
   * @param {Array} arr an array of IP addresses
   * @returns {Array} the array sorted numerically
   */
  sort: function (arr) {
    arr.sort(function (a, b) {
      return self.toInt(a) - self.toInt(b)
    })
    return arr
  }
}
