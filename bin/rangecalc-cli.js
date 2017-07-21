#!/usr/bin/env node

const ipaddr = require('ipaddr.js');
const readline = require('readline');
const rangecalc = require('../lib/rangecalc');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'rangecalc> ',
  completer: completer
});

var ipAddresses = [];

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'calc':
      var arr = rangecalc.sort(ipAddresses);
      var cidr = rangecalc.getCIDR(arr[0], arr[arr.length-1])
      console.log('Range is ' + cidr);
      break;
    case 'list':
      for (var i in ipAddresses) {
        console.log(ipAddresses[i].toString());
      }
      break;
    case 'clear':
      ipAddresses = [];
      console.log('IP list cleared');
      break;
    case '.help':
    case '.h':
      console.log('Input IP addresses and then enter \'calc\' to get a range.');
      break;
    case '.exit':
    case '.quit':
    case '.q':
      console.log('Bye!');
      process.exit(0);
    default:
      var input = line.trim();
      if (ipaddr.isValid(input)) {
        var addr = ipaddr.parse(input);
        ipAddresses.push(addr);
        console.log(input + ' added to list');
      } else {
        console.log(input + ' is not a valid IP address');
      }
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});

function completer(line) {
  const completions = 'calc clear list .help .h .exit .quit .q'.split(' ');
  const hits = completions.filter((c) => c.startsWith(line));
  return [hits.length ? hits : completions, line];
}

