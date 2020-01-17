const { exit } = require('shelljs');
const log = require('./log');

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

const installSuccess = (name, type) =>
  log.multiple([
    { color: 'green', str: '\nSuccess!' },
    { color: 'white', str: `Created ${type} ${name}` }
  ]);

const wrongPlace = () => (
  log.multiple([
    { color: 'red', str: '\nError!' },
    {
      color: 'white',
      str: `Project not found at ${process.cwd()}`
    }
  ]),
  log.info(`Please verify your location and move on source project.`),
  log.multiple([
    { color: 'white', str: 'Or Create a new Project with' },
    {
      color: 'cyan',
      str: `crap new <appName> [options]`
    },
    {
      color: 'white',
      str: `command.`
    }
  ])
);

const installFailed = (err, spinner = null) => {
  if (spinner && spinner.isSpinning) {
    spinner.fail(log.error(`Error : ${err}`));
    exit(1);
  }
  log.error(`Error : ${err}`);
  exit(1);
};

module.exports = {
  installProjectSuccess,
  installSuccess,
  wrongPlace,
  installFailed
};
