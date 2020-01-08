const shell = require('shelljs');
const chalk = require('chalk');

const addCreateReactApp = async (projectName, withTS, spinner) => {
  spinner.start(`Execute create-react-app ${withTS ? 'with typescript' : ''}`);
  return new Promise((resolve, reject) => {
    shell.exec(
      `npx create-react-app ${projectName.toLowerCase()}`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code != 0) {
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

module.exports = addCreateReactApp;
