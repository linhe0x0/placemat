'use strict'

let program = require('commander');
let request = require('request');

let utils = require('./utils');
let defaults = require('./defaults');


module.exports = function () {
  let type = program.args[0] || 'things';
  let href = 'https://placem.at/';
  let options = {};
  let url = '';

  if (defaults.types.indexOf(type) === -1) {
      return utils.showHelp();
  }

  options = utils.serialize(program);

  url = href + type + '?' + options;

  if (program.output) {
      let file = utils.extension(program.output);

      request
          .get(url)
          .on('response', function (response) {
              console.log('图片已成功保存到当前目录。'.green);
          })
          .on('error', function (error) {
              console.log('程序出现了一些错误，请您稍后再重新尝试: '.red);
              console.log(error);
          })
          .pipe(fs.createWriteStream(file));
  } else {
      request.get(url, function (error, res) {
          if (error) {
              console.log('程序出现了一些错误，请您稍后再重新尝试: '.red);
              console.log(error);

              return;
          }

          console.log('图片获取成功，请您手动复制以下路径进行使用: '.green);
          console.log('');
          console.log(res.request.uri.href);
          console.log('');
      });
  }
}
