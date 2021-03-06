const { exec } = require('shelljs');
const { installFailed } = require('../libs/messages');

const addCommit = async (projectName, spinner) => {
  spinner.start('Initial commit');
  return new Promise(resolve => {
    exec(
      `git add . && git commit --amend -m "Init starter project: ${projectName}"`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code !== 0) {
          installFailed(stderr, spinner);
        } else {
          spinner.succeed();
          return resolve(stdout);
        }
      }
    );
  });
};

module.exports = addCommit;
