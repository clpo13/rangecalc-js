#!/usr/bin/env node
// rangecalc - get the CIDR range of a set of IP addresses
// Copyright (C) 2017-2019 Cody Logan
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
const readline = require('readline')
const rangecalc = require('../lib/rangecalc')
const pjson = require('../package.json')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'rangecalc> ',
  completer: completer
})

let ipAddresses = []

console.log("Enter an IP address or type '.help'.")
rl.prompt()

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'calc':
      if (ipAddresses.length > 0) {
        const arr = rangecalc.sort(ipAddresses)
        const cidr = rangecalc.getCIDR(arr[0], arr[arr.length - 1])
        console.log('Range is /' + cidr)
      } else {
        console.log('List is empty')
      }
      break
    case 'list':
      for (const i in ipAddresses) {
        console.log(ipAddresses[i])
      }
      break
    case 'clear':
      ipAddresses = []
      console.log('IP list cleared')
      break
    case '.help':
    case '.h':
      console.log('Input IP addresses, one per line. Commands:\n' +
        '\tcalc               get the CIDR range of the IP list\n' +
        '\tclear              clear the IP address list\n' +
        '\tlist               show the current list of IP addresses\n' +
        '\t.help, .h          show this help text\n' +
        '\t.version, .v       show program version and license info\n' +
        '\t.exit, .quit, .q   exit the program\n')
      break
    case '.version':
    case '.v':
      console.log('rangecalc v' + pjson.version + '\n\n' +
        'Copyright (C) 2017, 2018, 2019 Cody Logan. Licensed GPLv3+.\n' +
        'This is free software, and you are welcome to modify\n' +
        'and redistribute it under certain conditions.\n' +
        '<https://www.gnu.org/licenses/gpl-3.0.en.html>\n')
      break
    case '.exit':
    case '.quit':
    case '.q':
      console.log('Bye!')
      process.exit(0)
      break // eslint-disable-line no-unreachable
    default: {
      const input = line.trim()
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
    }
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
