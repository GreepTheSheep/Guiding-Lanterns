const shell = require('shelljs');
const prompt = require('prompt');
const colors = require("colors/safe");
const wait = require('util').promisify(setTimeout);
const fs = require('fs');
const os = require('os');
const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));

title()

async function title() {
    console.log('┌─────────────────────────────────┐')
    console.log('│       The Guiding Lanterns      │')
    console.log('│                                 │')
    console.log('│             By ' + package.author + '            │')
    console.log('└─────────────────────────────────┘')
    console.log(package.repository.url)
    os_check();
}

async function os_check(){

    console.log('')
    await wait(5000)

    // Check OS
    console.log('# Checking Operating System...')
    await wait(2000)
    console.log(os.type())
    await wait(500)
    if (os.type() !== 'Linux'){
        console.error(colors.yellow('----- Warning: ------'))
        console.error('Your operating system is not Linux!')
        console.error('The script is highly recommended to be run on Linux system')
        console.error('We do not support on other systems than Linux')
        
        var schema = {
            properties: {
              validate: {
                description: colors.white('Are you sure to continue? (yes/no):'),
                type: 'string',
                pattern: /^\w+$/,
                message: 'Only reply with "yes" or "no"',
                default: 'no',
                required: true
              }
            }
        };
        prompt.message = '';
        prompt.delimiter = '';
        prompt.start();
        prompt.get(schema, function (err, result) {
            if (!result.validate.toLowerCase().includes('yes')){
                console.error(colors.red('Please run the script on Linux'))
                console.error(colors.red('Exiting...'))
                process.exit(1)
            } else if (result.validate.toLowerCase().includes('yes')){
                console.log(colors.cyan('okay, be careful!'))
                check_commands()
            }
          });
    } else {
        console.log(colors.green('You\'re safe!') + ' Support for The Guiding Lanterns is supported :)')
        check_commands()
    }
}

async function check_commands(){
    console.log('')
    await wait(5000)

    // Check commands

    console.log('# Checking if git is installed...')
    await wait(2000)
    shell.exec('git --version',{silent: true}, function(code, stdout, stder){
        if (code != 0){
            console.error(colors.red('----- ERROR: ------'))
            console.error('Git is not installed, please install git')
            console.error('please execute the command: apt install git')
            console.error('And retry the installation after')
            process.exit(code)
        } else {
            console.log('Git version: ' + stdout.replace('git version ', ''))
        }
    })
}

// Installing data/ folder
//console.log('Creating data/ folder...')
