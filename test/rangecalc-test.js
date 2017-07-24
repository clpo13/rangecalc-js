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
