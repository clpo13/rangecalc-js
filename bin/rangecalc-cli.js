#!/usr/bin/env node

// rangecalc - get the CIDR range of a set of IP addresses
// Copyright (C) 2017 Cody Logan
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
const readline = require('readline')
const rangecalc = require('../lib/rangecalc')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'rangecalc> ',
  completer: completer
})

var ipAddresses = []

console.log("Enter an IP address or type '.help'.")
rl.prompt()

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'calc':
      var arr = rangecalc.sort(ipAddresses)
      var cidr = rangecalc.getCIDR(arr[0], arr[arr.length - 1])
      console.log('Range is ' + cidr)
      break
    case 'list':
      for (var i in ipAddresses) {
        console.log(ipAddresses[i])
      }
      break
    case 'clear':
      ipAddresses = []
      console.log('IP list cleared')
      break
    case '.help':
    case '.h':
      console.log('Input IP addresses one per line. Commands:\n' +
        '\tlist - shows current list of IP addresses\n' +
        '\tcalc - get the CIDR range\n' +
        '\t.help, .h - show this text\n' +
        '\t.exit, .quit, .q - exit the program')
      break
    case '.exit':
    case '.quit':
    case '.q':
      console.log('Bye!')
      process.exit(0)
    default:
      var input = line.trim()
      if (ipaddr.isValid(input)) {
        if (ipaddr.parse(input).kind() === 'ipv6') {
          console.log('Sorry, IPv6 addresses are not currently supported!')
          break
        }
        ipAddresses.push(input)
        console.log(input + ' added to list')
      } else {
        console.log(input + ' is not a valid IP address')
      }
      break
  }
  rl.prompt()
}).on('close', () => {
  console.log('Bye!')
  process.exit(0)
})

function completer (line) {
  const completions = 'calc clear list .help .h .exit .quit .q'.split(' ')
  const hits = completions.filter((c) => c.startsWith(line))
  return [hits.length ? hits : completions, line]
}
