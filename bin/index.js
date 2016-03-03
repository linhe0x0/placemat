#!/usr/bin/env node
"use strict"

/**
 * Module dependencies.
 */
let querystring = require('querystring');
let fs = require('fs');
let program = require('commander');
let request = require('request');
let colors = require('colors');
let updateNotifier = require('update-notifier');

let pkg = require('../package.json');

let defaultType = ['people', 'places', 'things'];
let defaultKeys = {
    w: 'width',
    h: 'height',
    random: 'random',
    txt: 'text',
    txtClr: 'textColor',
    overlay_color: 'overlayColor',
    overlay_blend: 'overlayBlend'
};

/**
 * CLI
 */
program
    .version(pkg.version)
	.option('-w, --width <n>', 'Specifies the width of the returned image. Can be used alone, or alongside h. A number in pixels.')
	.option('-h, --height <n>', 'Specifies the height of the returned image. Can be used alone, or alongside w. A number in pixels.')
	.option('-r, --random <value>', 'By default, Placemat will always return the same image for a given size. If you want to mix things up a bit, pass random=1. If you want to get the same "random" image every time, pass any other value for random.')
	.option('-t, --text <txt>', 'Display custom text.')
	.option('-c, --textColor <color>', 'Change the displayed text color.')
	.option('-C, --overlayColor <color>', 'Defines a custom overlay color.')
	.option('-b, --overlayBlend <value>', 'Allows changing the overlay\'s blend mode.')
    .option('-o, --output <FILE>', 'write image to FILE.');

program.on('--help', function () {
    console.log('  Commands:');
    console.log('');
    console.log('    people <option>');
    console.log('');
    console.log('    places <option>');
    console.log('');
    console.log('    things <option>');
    console.log('');
    process.exit();
});

program.parse(process.argv);

updateNotifier({pkg}).notify();

if (!module.parent) {
    main();
}

function main() {
    let type = program.args[0];
    let href = 'https://placem.at/';
    let options = {};
    let url = '';

    if (!type || defaultType.indexOf(type) === -1) {
        return showHelp();
    }

    options = serialize(program);

    url = href + type + '?' + options;

    if (program.output) {
        let file = extension(program.output);

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

/**
 * showHelp.
 */
function showHelp() {
    process.stdout.write(program.helpInformation());
    program.emit('--help');
}

/**
 * serialize options.
 *
 * @param {Object} options
 */
function serialize(options) {
    var obj = {};

    for (var attr in defaultKeys) {
        if (!defaultKeys.hasOwnProperty(attr)) {
            return;
        }

        let opt = defaultKeys[attr];

        if (options[opt]) {
            obj[attr] = program[opt];
        }
    }

    return querystring.stringify(obj);
}

/**
 * add file extension.
 */
function extension(filename, extensionName) {
    extensionName = extensionName || 'jpeg';

    return filename.split('.').length > 1 ? filename : filename + '.' + extensionName;
}
