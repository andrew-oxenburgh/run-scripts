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
                require('./showScripts.ts')
            })
            // .argument('<string>', 'string to split')
            // .option('--first', 'display just the first substring')
            // .option('-s, --separator <char>', 'separator character', ',')
            // .action((str, options) => {
            //     const limit = options.first ? 1 : undefined;
            //     console.log(str.split(options.separator, limit));
            // });

        program.parse();

        const options = program.opts();
        const limit = options.first ? 1 : undefined;
        return options
    }
}

