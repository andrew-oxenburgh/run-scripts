const {program} = require('commander');
module.exports = {
    handleOpts: () => {
        program
            .name('npm-scripts')
            .description('show menu of scripts available in package.json')
            .version('0.8.0');

        program.command('menu')
            .description('show all scripts available')
            .action(()=>{
                require('./showScripts.ts').showScripts()
            })

        program.parse();

        return program.opts()
    }
}

