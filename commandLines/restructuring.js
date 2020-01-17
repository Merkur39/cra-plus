const { cd, mkdir, rm, ShellString, touch, mv } = require('shelljs');
const log = require('../libs/log');
const {
  appJS,
  appClassJS,
  appTestJS,
  headerJS,
  headerClassJS,
  headerTestJS,
  indexJS,
  serviceWorkerJS,
  setupTestsJS
} = require('../templates/templateJS');
const {
  appTSX,
  appClassTSX,
  appTestTSX,
  headerTSX,
  headerClassTSX,
  headerTestTSX,
  indexTSX,
  reactAppEnvTS,
  serviceWorkerTS,
  setupTestsTS,
  tsconfigJSON
} = require('../templates/templateTS');
const { appCSS, headerCSS, indexCSS } = require('../templates/templateCSS');
const { appSCSS, headerSCSS, indexSCSS } = require('../templates/templateSass');
const crapConfig = require('../templates/templateCrapConfig');
const { getConfig } = require('../libs/utils');
const { installFailed } = require('../libs/messages');

const restructuring = async (projectName, withTS, withSass, withClass, spinner) => {
  spinner.start('Restructuring');

  const commands = [];

  // Move to project & Create all repository and files needed
  commands.push(cd(`${projectName}`));

  // Delete all /src files
  commands.push(rm('-rf', [`src/*.js`, `src/*.css`]));

  // Create file of config project
  commands.push(
    touch('-c', 'crapConfig.json'),
    ShellString(crapConfig({ projectName, withTS, withSass, withClass })).to('crapConfig.json')
  );

  const config = getConfig();
  if (!config) {
    return installFailed('Configuration file "CrapConfig.json" not found', spinner);
  }

  // Create all repository and files needed
  commands.push(
    mkdir('-p', [
      'src/pages/App',
      'src/components/Header',
      'src/assets',
      'src/styles',
      'src/config'
    ]),
    touch('-c', [
      `src/index.${config.component}`,
      `src/styles/index.${config.style}`,
      `src/pages/App/App.component.${config.component}`,
      `src/pages/App/App.style.${config.style}`,
      `src/pages/App/App.test.${config.component}`,
      `src/components/Header/Header.component.${config.component}`,
      `src/components/Header/Header.style.${config.style}`,
      `src/components/Header/Header.test.${config.component}`,
      `src/config/serviceWorker.${config.logic}`,
      `src/setupTests.${config.logic}`
    ]),
    mv('src/logo.svg', 'src/assets/')
  );

  if (withTS) {
    commands.push(touch('-c', [`tsconfig.json`, `src/react-app-env.d.${config.logic}`]));
  }

  // Add all contents in files
  commands.push(
    ShellString(withTS ? indexTSX(withSass) : indexJS(withSass)).to(
      `src/index.${config.component}`
    ),
    ShellString(withSass ? indexSCSS : indexCSS).to(`src/styles/index.${config.style}`),
    ShellString(
      withTS
        ? withClass
          ? appClassTSX(withSass)
          : appTSX(withSass)
        : withClass
        ? appClassJS(withSass)
        : appJS(withSass)
    ).to(`src/pages/App/App.component.${config.component}`),
    ShellString(withSass ? appSCSS : appCSS).to(`src/pages/App/App.style.${config.style}`),
    ShellString(withTS ? appTestTSX : appTestJS).to(`src/pages/App/App.test.${config.component}`),

    ShellString(
      withTS
        ? withClass
          ? headerClassTSX(withSass)
          : headerTSX(withSass)
        : withClass
        ? headerClassJS(withSass)
        : headerJS(withSass)
    ).to(`src/components/Header/Header.component.${config.component}`),
    ShellString(withSass ? headerSCSS : headerCSS).to(
      `src/components/Header/Header.style.${config.style}`
    ),
    ShellString(withTS ? headerTestTSX : headerTestJS).to(
      `src/components/Header/Header.test.${config.component}`
    ),

    ShellString(withTS ? serviceWorkerTS : serviceWorkerJS).to(
      `src/config/serviceWorker.${config.logic}`
    ),

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
