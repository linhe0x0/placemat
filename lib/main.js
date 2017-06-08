'use strict'

const fs = require('fs')
const program = require('commander');
const request = require('request');

const utils = require('./utils');
const defaults = require('./defaults');

module.exports = function () {
  const type = program.args[0] || 'things';
  const href = 'https://placem.at/';
  let options = {};
  let url = '';

  if (defaults.types.indexOf(type) === -1) {
    return utils.showHelp();
  }

  options = utils.serialize(program);

  url = href + type + '?' + options;

  request
    .get({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
      }
    })
    .on('response', function (res) {
      if (program.output) {
        const file = utils.extension(program.output);

        res
          .pipe(fs.createWriteStream(file))
          .on('finish', function (response) {
            console.log('图片已成功保存到当前目录。'.green);
          })
          .on('error', function (error) {
            console.log('程序出现了一些错误，请您稍后再重新尝试: '.red);
            console.log(error);
            process.exit(1)
          })
      } else {
        console.log('图片获取成功，请您手动复制以下路径进行使用: '.green);
        console.log('');
        console.log(res.request.uri.href.underline);
        console.log('');
        process.exit(0)
      }
    })
    .on('error', function (error) {
      console.log('程序出现了一些错误，请您稍后再重新尝试: '.red);
      console.log(error);

      process.exit(1)
    })
}
