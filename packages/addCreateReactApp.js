const shell = require('shelljs');
const { installFailed } = require('../libs/messages');

const addCreateReactApp = async (projectName, spinner) => {
  spinner.start(`Execute create-react-app`);
  return new Promise(resolve => {
    shell.exec(`npx create-react-app ${projectName}`, { silent: true }, (code, stdout, stderr) => {
      if (code != 0) {
        installFailed(stderr, spinner);
      } else {
        spinner.succeed();
        return resolve(stdout);
      }
    });
  });
};

module.exports = addCreateReactApp;
