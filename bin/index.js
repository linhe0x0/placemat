#!/usr/bin/env node
'use strict'

/**
 * Module dependencies.
 */
let fs = require('fs');
let program = require('commander');
let colors = require('colors');
let updateNotifier = require('update-notifier');

let pkg = require('../package.json');
let main = require('../lib/main');

/**
 * CLI
 */
program
  .version(pkg.version)
  .usage('<command> [options]')
  .option('-w, --width <n>', 'Specifies the width of the returned image. Can be used alone, or alongside h. A number in pixels.')
  .option('-h, --height <n>', 'Specifies the height of the returned image. Can be used alone, or alongside w. A number in pixels.')
  .option('-r, --random <value>', 'By default, Placemat will always return the same image for a given size. If you want to mix things up a bit, pass random=1. If you want to get the same "random" image every time, pass any other value for random.')
  .option('-t, --text <txt>', 'Display custom text.')
  .option('-c, --textColor <color>', 'Change the displayed text color.')
  .option('-C, --overlayColor <color>', 'Defines a custom overlay color.')
  .option('-b, --overlayBlend <value>', 'Allows changing the overlay\'s blend mode.')
  .option('-o, --output <FILE>', 'write image to FILE.')

program.on('--help', function () {
  console.log('  Commands:');
  console.log('');
  console.log('    people [options]');
  console.log('');
  console.log('    places [options]');
  console.log('');
  console.log('    things [options] (default)');
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ placemat things -w 200');
  console.log('    $ placemat things -w 200 -h 300');
  console.log('');
  process.exit(0);
});

program.parse(process.argv);

updateNotifier({pkg}).notify();

if (!module.parent) {
  main();
}
