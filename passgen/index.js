#!/urs/bin/env node
const program  = require('commander')
// Bring in chalk package
const chalk = require('chalk')
// Bring in clipboard
const clipboardy = require('clipboardy')
// Console.log variable
const log = console.log
// bringing in createPassword
const createPassword = require('./utils/createPassword')
const savePassword = require('./utils/savePassword')

// Creating  a help menu ('-h')
program.version('1.0.0').description('Simple password generator')

// chain on options using .option('option-name')
program
// Create a command using commander
// .command('generate')
// command('command-name').action(function)
// .action(() => {
//   console.log('Generated')
// })
// Creating a program option 
.option('-l, --length <number>', 'length of password', '8')
.option('-s, --save', 'save password to password.txt')
// Creating an option to not use numbers
.option('-nn, --no-numbers', 'remove numbers')
// Creating an option to not use symbols
.option('-ns, --no-symbols', 'remove symbols')
.parse()
// console.log the program options
// console.log(program.opts())

const {length, save, numbers, symbols} = program.opts()

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols)

// Save to file
if(save) {
  savePassword(generatedPassword)
}

// Copy to clipboard
clipboardy.writeSync(generatedPassword)

// output generated password
log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword))
log(chalk.yellow('Password copied to the clipboard'))
