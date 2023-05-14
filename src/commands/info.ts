import { readArrayFromFile, readPackageFile } from '../utils'

const term = require('terminal-kit').terminal

interface TKResponseType {
    unexpectedKey: boolean
    selectedIndex: number
    selectedText: string
    submitted: boolean
    cancelled: boolean
    x: number
    y: number
}

module.exports = {
    command: () => {
        const packageObj = readPackageFile().engines.node
        const nvmrc = readArrayFromFile('.nvmrc')[0]
        const table = [
            ['package', packageObj],
            ['.nvmrc', nvmrc]
        ]

        term.table(table, {
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
        }
        )
    }
}
