const shell = require('shelljs');
const chalk = require('chalk');

const addCommit = async (spinner, PROJECT_NAME) => {
  spinner.start('Initial commit');
  return new Promise((resolve, reject) => {
    shell.exec(
      `git add . && git commit -m "Init starter project: ${PROJECT_NAME}"`,
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

module.exports = addCommit;
