const shell = require('shelljs');
const { PackagesTypescriptList } = require('../constants/packages');
const { installFailed } = require('../libs/messages');

const cmdNpm = () =>
  `npm i -D ${PackagesTypescriptList.map(p => `${p.prefix}${p.name}`)}`.replace(/,/g, ' ');

const addPackages = async spinner => {
  spinner.start('Install Typescript & Dependencies');
  return new Promise(resolve => {
    shell.exec(cmdNpm(), { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        installFailed(stderr, spinner);
      } else {
        spinner.succeed();
        return resolve(stdout);
      }
    });
  });
};

module.exports = addPackages;
