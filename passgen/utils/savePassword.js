const fs = require('fs')
const path = require('path')
const os = require('os')
const chalk = require('chalk')

const savePassword = (password) => {
  // Creating and saving the password to a existing or new .txt file
  // The 'a' means to append the new password to the existing file
  // the '666' is the permission
  fs.open(path.join(__dirname, '../', 'password.txt'), 'a', 666, (_, id) => {
    fs.write(id, password + os.EOL, null, 'utf-8', () => {
      fs.close(id, () => {
        console.log(chalk.green('Password saved to password.txt'))
      })
    })
  })
}

module.exports = savePassword