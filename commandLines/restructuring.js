const { cd, mkdir, rm, ShellString, touch, mv } = require('shelljs');
const log = require('../libs/log');
const {
  appJS,
  appClassJS,
  exampleContainerJS,
  exampleContainerClassJS,
  exampleContainerTestJS,
  exampleJS,
  exampleClassJS,
  exampleTestJS,
  indexJS,
  serviceWorkerJS,
  setupTestsJS,
} = require('../templates/templateJS');
const {
  appTSX,
  appClassTSX,
  exampleContainerTSX,
  exampleContainerClassTSX,
  exampleContainerTestTSX,
  exampleTSX,
  exampleClassTSX,
  exampleTestTSX,
  indexTSX,
  reactAppEnvTS,
  serviceWorkerTS,
  setupTestsTS,
  tsconfigJSON,
} = require('../templates/templateTS');
const { exampleContainerCSS, exampleCSS, indexCSS } = require('../templates/templateCSS');
const { exampleContainerSCSS, exampleSCSS, indexSCSS } = require('../templates/templateSass');
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
  commands.push(touch('-c', 'crapConfig.json'), ShellString(crapConfig({ projectName, withTS, withSass, withClass })).to('crapConfig.json'));

  const config = getConfig();
  if (!config) {
    return installFailed('Configuration file "CrapConfig.json" not found', spinner);
  }

  // Create all repository and files needed
  commands.push(
    mkdir('-p', ['src/components/Container/ExampleContainer', 'src/components/Content/Example', 'src/assets', 'src/styles', 'src/config']),
    touch('-c', [
      `src/index.${config.component}`,
      `src/styles/index.${config.style}`,
      `src/App.${config.component}`,
      `src/components/Container/ExampleContainer/ExampleContainer.component.${config.component}`,
      `src/components/Container/ExampleContainer/${withSass ? '_' : ''}ExampleContainer.style.${config.style}`,
      `src/components/Container/ExampleContainer/ExampleContainer.test.${config.component}`,
      `src/components/Content/Example/Example.component.${config.component}`,
      `src/components/Content/Example/${withSass ? '_' : ''}Example.style.${config.style}`,
      `src/components/Content/Example/Example.test.${config.component}`,
      `src/config/serviceWorker.${config.logic}`,
      `src/setupTests.${config.logic}`,
    ]),
    mv('src/logo.svg', 'src/assets/')
  );

  if (withTS) {
    commands.push(touch('-c', [`tsconfig.json`, `src/react-app-env.d.${config.logic}`]));
  }

  // Add all contents in files
  commands.push(
    ShellString(withTS ? indexTSX(withSass) : indexJS(withSass)).to(`src/index.${config.component}`),
    ShellString(withSass ? indexSCSS : indexCSS).to(`src/styles/index.${config.style}`),
    ShellString(withTS ? (withClass ? appClassTSX() : appTSX()) : withClass ? appClassJS() : appJS()).to(`src/App.component.${config.component}`),

    ShellString(
      withTS
        ? withClass
          ? exampleContainerClassTSX(withSass)
          : exampleContainerTSX(withSass)
        : withClass
        ? exampleContainerClassJS(withSass)
        : exampleContainerJS(withSass)
    ).to(`src/components/Container/ExampleContainer/ExampleContainer.component.${config.component}`),
    ShellString(withSass ? exampleContainerSCSS : exampleContainerCSS).to(
      `src/components/Container/ExampleContainer/${withSass ? '_' : ''}ExampleContainer.style.${config.style}`
    ),
    ShellString(withTS ? exampleContainerTestTSX : exampleContainerTestJS).to(
      `src/components/Container/ExampleContainer/ExampleContainer.test.${config.component}`
    ),

    ShellString(
      withTS ? (withClass ? exampleClassTSX(withSass) : exampleTSX(withSass)) : withClass ? exampleClassJS(withSass) : exampleJS(withSass)
    ).to(`src/components/Content/Example/Example.component.${config.component}`),
    ShellString(withSass ? exampleSCSS : exampleCSS).to(`src/components/Content/Example/${withSass ? '_' : ''}Example.style.${config.style}`),
    ShellString(withTS ? exampleTestTSX : exampleTestJS).to(`src/components/Content/Example/Example.test.${config.component}`),

    ShellString(withTS ? serviceWorkerTS : serviceWorkerJS).to(`src/config/serviceWorker.${config.logic}`),

    ShellString(withTS ? setupTestsTS : setupTestsJS).to(`src/setupTests.${config.logic}`)
  );

  if (withTS) {
    commands.push(ShellString(reactAppEnvTS).to(`src/react-app-env.d.${config.logic}`), ShellString(tsconfigJSON).to(`tsconfig.json`));
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
