#!/usr/bin/env node
/**
 * 命令行模版工具
 * npm link
 * ncmd -V
 * ncmd -h
 * ncmd tpl gitignore-js
 */

const program = require('commander')
//const shell = require('shelljs')
const fs = require('fs')
const https = require("https")
//const download = require('download-git-repo');
const version = require('../package.json').version
const TEMPLATE_PATH = 'https://raw.githubusercontent.com/gegeliu/ncmd/master/templates/'

program
    .version(version)
    .usage('<command> [options] 快速生成文件') //-h 打印的用户提示
program
    .command('tpl <name>')
    .description('获取远端文件名')
    .action((name) => {
        console.log("getfile " + name + " ...")
        if (name && name.length) {
            let url = TEMPLATE_PATH + name
            https.get(url, resposne => {
                const file = fs.createWriteStream(name)
                resposne.pipe(file)
                console.log(name + " created")
            }).on('error', (e) => {
                console.error(e)
            })
        }
    })
program
    .command('init <name>')
    .description('获取远端特定脚手架 see: https://github.com/lin-xin/blog/issues/27')
    .action((name) => {
        console.log("完善中 " + name)
    })

program.parse(process.argv)



