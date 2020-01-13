const { cd, mkdir, rm, ShellString, touch } = require('shelljs');
const log = require('./cliColors');
const {
  appJS,
  appTestJS,
  indexJS,
  serviceWorkerJS,
  setupTestsJS
} = require('../templates/templateJS');
const {
  appTSX,
  appTestTSX,
  indexTSX,
  reactAppEnvTS,
  serviceWorkerTS,
  setupTestsTS,
  tsconfigJSON
} = require('../templates/templateTS');
const { appCSS, indexCSS } = require('../templates/templateCSS');
const { appSCSS, indexSCSS } = require('../templates/templateSass');
const crapConfig = require('../templates/templateCrapConfig');
const { getConfig } = require('./utils');
const { installFailed } = require('./messages');

const restructuring = async (projectName, withTS, withSass, spinner) => {
  spinner.start('Restructuring');

  const commands = [];

  // Move to project & Create all repository and files needed
  commands.push(cd(`${projectName}`));

  // Delete all /src files
  commands.push(rm('-rf', [`src/*.js`, `src/*.css`]));

  // Create file of config project
  commands.push(
    touch('-c', 'crapConfig.json'),
    ShellString(crapConfig(projectName, withTS, withSass)).to('crapConfig.json')
  );

  const config = getConfig();
  if (!config) {
    return installFailed('Configuration file "CrapConfig.json" not found', spinner);
  }

  // Create all repository and files needed
  commands.push(
    mkdir('-p', ['src/components/App', 'src/assets']),
    touch('-c', [
      `src/index.${config.component}`,
      `src/index.${config.style}`,
      `src/components/App/App.component.${config.component}`,
      `src/components/App/App.style.${config.style}`,
      `src/components/App/App.test.${config.component}`,
      `src/serviceWorker.${config.logic}`,
      `src/setupTests.${config.logic}`
    ])
  );

  if (withTS) {
    commands.push(touch('-c', [`tsconfig.json`, `src/react-app-env.d.${config.logic}`]));
  }

  // Add all contents in files
  commands.push(
    ShellString(withTS ? indexTSX(withSass) : indexJS(withSass)).to(
      `src/index.${config.component}`
    ),
    ShellString(withSass ? indexSCSS('App') : indexCSS).to(`src/index.${config.style}`),
    ShellString(withTS ? appTSX(withSass) : appJS(withSass)).to(
      `src/components/App/App.component.${config.component}`
    ),
    ShellString(withSass ? appSCSS : appCSS).to(`src/components/App/App.style.${config.style}`),
    ShellString(withTS ? appTestTSX : appTestJS).to(
      `src/components/App/App.test.${config.component}`
    ),
    ShellString(withTS ? serviceWorkerTS : serviceWorkerJS).to(`src/serviceWorker.${config.logic}`),
    ShellString(withTS ? setupTestsTS : setupTestsJS).to(`src/setupTests.${config.logic}`)
  );

  if (withTS) {
    commands.push(
      ShellString(reactAppEnvTS).to(`src/react-app-env.d.${config.logic}`),
      ShellString(tsconfigJSON).to(`tsconfig.json`)
    );
  }

  // Print errors but continue install
  for (const command of commands) {
    if (command.code !== 0 && command.stderr !== undefined) {
      log.error(`${command.stderr}`);
    }
  }

  spinner.succeed();
};

module.exports = restructuring;
