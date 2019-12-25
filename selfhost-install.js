const shell = require('shelljs');
const prompt = require('prompt');
const colors = require("colors/safe");
const wait = require('util').promisify(setTimeout);
const fs = require('fs');
const os = require('os');
const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const request = require('request')

title()

async function title() {
    console.log('┌─────────────────────────────────┐')
    console.log('│       The Guiding Lanterns      │')
    console.log('│                                 │')
    console.log('│             By ' + package.author + '            │')
    console.log('└─────────────────────────────────┘')
    console.log(colors.grey(package.repository.url))
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
                description: colors.white(colors.underline('Are you sure to continue?') + ' (yes/no):'),
                type: 'string',
                pattern: /^\w+$/,
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
    shell.exec('git --version',{silent: true}, function(code, stdout, stderr){
        if (code != 0){
            console.error(colors.red('----- ERROR: ------'))
            console.error('Git is not installed, please install git')
            if (os.type() == 'Linux') console.error('please execute the command: apt install git')
            else if (os.type() == 'Windows_NT') console.log('please install git at https://git-scm.com/download/win')
            else console.log('please install git')
            console.error('And retry the installation after')
            process.exit(code)
        } else {
            console.log(colors.green('Git is installed!') + ' Version: ' + stdout.replace('git version ', ''))
            version_check()
        }
    })
}

async function version_check(){
    await wait(5000)

    console.log('# Checking versions...')
    await wait(2000)
    
    var packageurl = 'https://raw.githubusercontent.com/Guiding-Lanterns/Guiding-Lanterns/master/package.json'
    request({
        url: packageurl,
        json: true
    }, async function (error, response, body) {
        console.log('Current local version: ' + package.version)
        await wait(1000)
        if (!error && response.statusCode === 200) {
            console.log('Current remote version ' + body.version)
            if (package.version == body.version) console.log(colors.green('Great!') + ' No pull required\nYou can pull manually by executing the command: git pull')
            else if (package.version != body.version){
                console.log(colors.yellow('A pull is required!') + ' I\'ll pull for you')
                shell.exec('git pull', {silent: true}, async function(code, stdout, stderr){
                    if (code != 0){
                        
                    }
                })
            }
        } else {
            console.error(colors.red('----- ERROR: ------'))
            console.error('We\'re unable to reach GitHub server')
            if (error !== null) console.error(error)
            console.error('Status Code : ' + response.statusCode)
            console.error(colors.red('-------------------'))
        }
    })
}