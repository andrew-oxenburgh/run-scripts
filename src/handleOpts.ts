const { program } = require('commander')
const helpText = 'show all package scripts available'

module.exports = {
    handleOpts: () => {
        program
            .name('npm-scripts')
            .description('show menu of scripts available in package.json')
            .version('0.8.0')
            .addHelpText('before', helpText)

        program.command('menu')
            .description('show all scripts available in the local package.json')
            .action(() => {
                require('./commands/scriptsTable').showScripts()
            })

        program.command('info')
            .description('show various metrics about the current project')
            .action(() => {
                require('./commands/info').command()
            })

        program.parse()
        return program.opts()
    }
}
