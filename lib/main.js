'use strict'

const fs = require('fs')
const program = require('commander');
const request = require('request');
const ProgressBar = require('progress');
const ora = require('ora');

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

  const spinner = ora('正在获取图片...').start()

  request
    .get({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
      }
    })
    .on('response', function (res) {
      const total = parseInt(res.headers['content-length'], 10)

      spinner.succeed('获取图片成功');

      if (program.output) {
        const file = utils.extension(program.output);

        const bar = new ProgressBar('正在下载图片：[:bar] :percent', {
          complete: '=',
          incomplete: ' ',
          width: 50,
          total: total
        });

        res
          .on('data', function (chunk) {
            bar.tick(chunk.length);
          })
          .pipe(fs.createWriteStream(file))
          .on('finish', function (response) {
            console.log('🍺  图片 %s 已成功保存到当前目录', file);
          })
      } else {
        console.log('🍺  图片获取成功，请您手动复制以下路径进行使用: ');
        console.log('');
        console.log(res.request.uri.href.green.underline);
        console.log('');
        process.exit(0)
      }
    })
    .on('error', function (error) {
      spinner.fail('程序出现了一些错误，请您稍后再重新尝试。');
      console.log(error);

      process.exit(1)
    })
}
