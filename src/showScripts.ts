const fs = require('fs');
const term = require('terminal-kit').terminal;
const R = require('ramda')
module.exports = {
    showScripts: () => {
        const scripts = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const table = R.toPairs(scripts.scripts)
        term.table([
                ['name', 'command'],
                ...table
            ], {
                hasBorder: true,
                contentHasMarkup: true,
                borderChars: 'lightRounded',
                borderAttr: {color: 'blue'},
                textAttr: {bgColor: 'default'},
                // firstCellTextAttr: {bgColor: 'blue'},
                firstRowTextAttr: {bgColor: 'white', color: 'black', bold: true},
                // firstColumnTextAttr: {bgColor: 'red'},
                expandToWidth: true,
                fit: true   // Activate all expand/shrink + wordWrap
            }
        );
    }
}

