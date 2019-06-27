// rangecalc - get the CIDR range of a set of IP addresses
// Copyright (C) 2017–2019 Cody Logan
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

var assert = require('assert')
var rangecalc = require('../lib/rangecalc')
var lint = require('mocha-eslint')

describe('Rangecalc', function () {
  describe('IPv4', function () {
    it('should return the proper range', function () {
      var start = '192.168.0.1'
      var end = '192.168.0.254'
      assert(rangecalc.getCIDR(start, end) === 24)
    })

    it('should return 32 when the IP addresses are identical', function () {
      var start = '192.168.0.1'
      var end = start
      assert(rangecalc.getCIDR(start, end) === 32)
    })

    it('should return the right integer representation', function () {
      var ip = '192.168.0.1'
      assert(rangecalc.toInt(ip) === 3232235521)
    })

    it('should order the addresses properly', function () {
      var arr = ['192.168.0.1', '192.168.0.254', '192.168.0.50']
      var sortedArr = rangecalc.sort(arr)
      assert(sortedArr[2] === '192.168.0.254')
    })
  })

  describe('IPv6', function () {
    it('should return the proper range')

    it('should return the right integer representation')
  })
})

describe('lint', function () {
  var paths = [
    'bin',
    'lib',
    'test'
  ]

  var options = {
    formatter: 'stylish',
    alwaysWarn: false,
    timeout: 5000,
    slow: 1000,
    strict: true
  }

  lint(paths, options)
})
