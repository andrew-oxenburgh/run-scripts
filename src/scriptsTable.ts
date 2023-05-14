import path from 'path'
import { exec, type ExecException } from 'child_process'

const fs = require('fs')
const term = require('terminal-kit').terminal
const R = require('ramda')
// import { type ExecException } from 'child_process'
// const exec = require('child_process').exec

interface TKResponseType {
    unexpectedKey: boolean
    selectedIndex: number
    selectedText: string
    submitted: boolean
    cancelled: boolean
    x: number
    y: number
}

const resolve = (command: string): void => {
    console.log('resolving = ' + command)
    exec(command,
        (error: ExecException, stdout: string, _stderr: string) => {
            console.log('resolved ' + command)
            if (error) {
                console.log('error = ' + JSON.stringify(error, null, 3))
                throw error
            }
            if (_stderr) {
                console.error(`exec error: ${_stderr}`)
            }
            console.log(stdout)
            console.log('=====================')
            process.exit()
        }
    )
}

module.exports = {
    showScripts: () => {
        const filepath = path.resolve(process.cwd(), 'package.json')
        const scripts = JSON.parse(fs.readFileSync(filepath, 'utf8')).scripts
        const table =
            R.reduce((acc, val) => {
                acc.push((val[0].padEnd(15) + ': ' + val[1]))
                return acc
            }, [], R.toPairs(scripts))
        term.singleColumnMenu(table, {
            hasBorder: true,
            contentHasMarkup: true,
            borderChars: 'lightRounded',
            borderAttr: { color: 'blue' },
            textAttr: { bgColor: 'default' },
            // firstCellTextAttr: {bgColor: 'blue'},
            firstRowTextAttr: { bgColor: 'white', color: 'black', bold: true },
            // firstColumnTextAttr: {bgColor: 'red'},
            expandToWidth: true,
            fit: true,
            cancelable: true,
            exitOnUnexpectedKey: true
        },
        (error: boolean, response: TKResponseType) => {
            if (error || response.cancelled || response.unexpectedKey) {
                process.exit()
            }
            console.log('response = ' + JSON.stringify(response, null, 3))
            const text = response.selectedText.split(' ')[0]
            console.log('text = ' + text)
            resolve('yarn ' + text)
        }
        )
    }
}
