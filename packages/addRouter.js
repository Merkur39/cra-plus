const shell = require('shelljs');
const { PackagesList } = require('../constants/packages');
const { installFailed } = require('../libs/messages');

const cmdNpm = (withTS) => `npm i ${PackagesList(withTS).map((p) => `${p.prefix}${p.name}`)}`.replace(/,/g, ' ');

const addRouter = async (spinner, withTS) => {
  spinner.start('Install react-router-dom');
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

module.exports = addRouter;
