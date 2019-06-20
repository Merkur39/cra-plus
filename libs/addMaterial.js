const shell = require('shelljs');
const chalk = require('chalk');

const addMaterial = async spinner => {
  spinner.start('Install @material-ui/core');
  return new Promise((resolve, reject) => {
    shell.exec(`npm install @material-ui/core`, { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
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

module.exports = addMaterial;
