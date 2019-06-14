const shell = require('shelljs');
const chalk = require('chalk');

const addRouter = async spinner => {
  spinner.start('Install react-router-dom');
  return new Promise((resolve, reject) => {
    shell.exec(`npm install react-router-dom`, { silent: true }, (code, stdout, stderr) => {
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

module.exports = addRouter;
