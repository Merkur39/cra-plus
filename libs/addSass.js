const shell = require('shelljs');
const chalk = require('chalk');

const addSass = async (spinner, withTS) => {
  spinner.start('Install node-sass');
  return new Promise(resolve => {
    shell.exec(
      `npm i -S node-sass ${withTS ? 'npm i -D @types/node-sass' : ''}`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code !== 0) {
          spinner.stop();
          shell.echo(chalk.red.bold(`${stderr}`));
          shell.exit(1);
        } else {
          spinner.succeed();
          return resolve(stdout);
        }
      }
    );
  });
};

module.exports = addSass;
