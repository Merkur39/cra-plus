const { exit } = require('shelljs');
const log = require('./cliColors');

const installProjectSuccess = projectName => (
  log.multiple([
    { color: 'green', str: '\nSuccess!' },
    { color: 'white', str: `Created ${projectName} project at ${process.cwd()}` }
  ]),
  log.info(`Inside that directory, you can run several commands:\n`),
  log.info(`npm start`, 'cyan'),
  log.info(`  Starts the development server.\n`),
  log.info(`npm run build`, 'cyan'),
  log.info(`  Bundles the app into static files for production.\n`),
  log.info(`npm test`, 'cyan'),
  log.info(`  Starts the test runner.\n`),
  log.info(`npm run eject`, 'cyan'),
  log.info(`  Removes this tool and copies build dependencies, configuration files`),
  log.info(`  and scripts into the app directory. If you do this, you can’t go back!\n`),
  log.info(`We suggest that you begin by typing:\n`),
  log.multiple([
    { color: 'cyan', str: 'cd' },
    { color: 'white', str: `${projectName}` }
  ]),
  log.info(`npm start\n`, 'cyan'),
  log.info(`Happy hacking!\n`)
);

const installComponentSuccess = componentName =>
  log.multiple([
    { color: 'green', str: '\nSuccess!' },
    { color: 'white', str: `Created Component ${componentName}` }
  ]);

const installFailed = (err, spinner = null) => {
  if (spinner && spinner.isSpinning) {
    spinner.fail(log.error(`Error : ${err}`));
    exit(1);
  }
  log.error(`Error : ${err}`);
  exit(1);
};

module.exports = { installProjectSuccess, installComponentSuccess, installFailed };
