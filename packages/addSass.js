const shell = require('shelljs');
const { PackagesSassList } = require('../constants/packages');
const { installFailed } = require('../libs/messages');

const cmdNpm = (withTS) => `npm i -D ${PackagesSassList(withTS).map((p) => `${p.prefix}${p.name}`)}`.replace(/,/g, ' ');

const addSass = async (spinner, withTS) => {
  spinner.start('Install node-sass');
  return new Promise((resolve) => {
    shell.exec(cmdNpm(withTS), { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        installFailed(stderr, spinner);
      } else {
        spinner.succeed();
        return resolve(stdout);
      }
    });
  });
};

module.exports = addSass;
