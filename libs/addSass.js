const shell = require('shelljs');
const { installFailed } = require('./messages');

const addSass = async (spinner, withTS) => {
  spinner.start('Install node-sass');
  return new Promise(resolve => {
    shell.exec(
      `npm i -D node-sass ${withTS ? '@types/node-sass' : ''}`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code !== 0) {
          installFailed(stderr, spinner);
        } else {
          spinner.succeed();
          return resolve(stdout);
        }
      },
    );
  });
};

module.exports = addSass;
