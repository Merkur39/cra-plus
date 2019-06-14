const shell = require('shelljs');
const chalk = require('chalk');

const addRedux = async spinner => {
  spinner.start('Install redux & react-redux');
  return new Promise((resolve, reject) => {
    shell.exec(`npm install redux react-redux`, { silent: true }, (code, stdout, stderr) => {
      if (code != 0) {
        spinner.stop();
        shell.echo(chalk.red.bold(`${stderr}`));
        shell.exit(1);
      } else {
        spinner.succeed();
        return resolve(stdout);
      }
    });
  });
};

module.exports = addRedux;
