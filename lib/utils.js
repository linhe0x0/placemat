'use strict'

let program = require('commander');
let querystring = require('querystring');

let defaults = require('./defaults');

/**
 * showHelp.
 */
exports.showHelp = function () {
  process.stdout.write(program.helpInformation());
  program.emit('--help');
}

/**
 * serialize options.
 *
 * @param {Object} options
 */
exports.serialize = function (options) {
  let obj = {};
  let keys = defaults.keys

  for (var attr in keys) {
    if (!keys.hasOwnProperty(attr)) {
      return;
    }

    let opt = keys[attr];

    if (options[opt]) {
      obj[attr] = program[opt];
    }
  }

  return querystring.stringify(obj);
}

/**
 * add file extension.
 */
exports.extension = function (filename, extensionName) {
  extensionName = extensionName || 'jpeg';

  return filename.split('.').length > 1 ? filename : filename + '.' + extensionName;
}
