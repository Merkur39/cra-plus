const shell = require('shelljs');
const chalk = require('chalk');
const { PackagesTypescriptList } = require('../constants/packages');

const cmdNpm = () =>
  `npm i ${PackagesTypescriptList.map(p => `${p.prefix}${p.name}`)}`.replace(
    /,/g,
    ' '
  );

const addPackages = async spinner => {
  spinner.start('Install Typescript & Dependencies');
  return new Promise(resolve => {
    shell.exec(cmdNpm(), { silent: true }, (code, stdout, stderr) => {
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

module.exports = addPackages;
