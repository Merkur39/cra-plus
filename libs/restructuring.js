const shell = require('shelljs');
const chalk = require('chalk');
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

const getExtFiles = (withTS, withSass) => {
  return {
    component: withTS ? 'tsx' : 'js',
    logic: withTS ? 'ts' : 'js',
    style: withSass ? 'scss' : 'css'
  };
};

const restructuring = async (projectName, withTS, withSass, spinner) => {
  const extensionFiles = getExtFiles(withTS, withSass);
  spinner.start('Restructuring');
  return new Promise(resolve => {
    const commands = [];

    // Move to project & Create all repository and files needed
    commands.push(shell.cd(`${projectName}`));

    // Delete all /src files
    commands.push(shell.rm('-rf', [`src/*.js`, `src/*.css`]));

    // Create all repository and files needed
    commands.push(shell.mkdir('-p', 'src/components/App'));
    commands.push(
      shell.touch('-c', [
        `src/index.${extensionFiles.component}`,
        `src/index.${extensionFiles.style}`,
        `src/components/App/App.component.${extensionFiles.component}`,
        `src/components/App/App.style.${extensionFiles.style}`,
        `src/components/App/App.test.${extensionFiles.component}`,
        `src/serviceWorker.${extensionFiles.logic}`,
        `src/setupTests.${extensionFiles.logic}`
      ])
    );

    if (withTS) {
      commands.push(
        shell.touch('-c', [
          `tsconfig.json`,
          `src/react-app-env.d.${extensionFiles.logic}`
        ])
      );
    }

    // Add all contents in files
    commands.push(
      shell
        .ShellString(withTS ? indexTSX(withSass) : indexJS(withSass))
        .to(`src/index.${extensionFiles.component}`)
    );
    commands.push(
      shell
        .ShellString(withSass ? indexSCSS : indexCSS)
        .to(`src/index.${extensionFiles.style}`)
    );

    commands.push(
      shell
        .ShellString(withTS ? appTSX(withSass) : appJS(withSass))
        .to(`src/components/App/App.component.${extensionFiles.component}`)
    );
    commands.push(
      shell
        .ShellString(withSass ? appSCSS : appCSS)
        .to(`src/components/App/App.style.${extensionFiles.style}`)
    );
    commands.push(
      shell
        .ShellString(withTS ? appTestTSX : appTestJS)
        .to(`src/components/App/App.test.${extensionFiles.component}`)
    );

    commands.push(
      shell
        .ShellString(withTS ? serviceWorkerTS : serviceWorkerJS)
        .to(`src/serviceWorker.${extensionFiles.logic}`)
    );
    commands.push(
      shell
        .ShellString(withTS ? setupTestsTS : setupTestsJS)
        .to(`src/setupTests.${extensionFiles.logic}`)
    );

    if (withTS) {
      commands.push(
        shell
          .ShellString(reactAppEnvTS)
          .to(`src/react-app-env.d.${extensionFiles.logic}`)
      );
      commands.push(shell.ShellString(tsconfigJSON).to(`tsconfig.json`));
    }

    // Print errors but continue install
    for (const command of commands) {
      if (command.code !== 0) {
        shell.echo(chalk.red.bold(`${command.stderr}`));
      }
    }

    spinner.succeed();
    resolve(commands);
  });
};

module.exports = restructuring;
