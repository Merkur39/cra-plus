const ora = require('ora');
const spinner = ora();
spinner.color = 'green';
spinner.spinner = 'dots';
const { existsSync } = require('fs');
const { exit } = require('shelljs');
const addCreateReactApp = require('../packages/addCreateReactApp');
const addCommit = require('../packages/addCommit');
const restructuring = require('./restructuring');
const addSass = require('../packages/addSass');
const addTypescript = require('../packages/addTypescript');
const { installProjectSuccess, installFailed } = require('../libs/messages');

const createProject = async (projectName, opts) => {
  await addCreateReactApp(projectName, spinner);
  await restructuring(projectName, opts.typescript, opts.sass, opts.class, spinner);

  if (opts.sass) {
    await addSass(spinner, opts.typescript);
  }
  if (opts.typescript) {
    await addTypescript(spinner);
  }

  // New commit after customization
  await addCommit(projectName, spinner);

  if (spinner && spinner.isSpinning) {
    spinner.stop();
  }

  // Show success message
  installProjectSuccess(projectName);
  exit(0);
};

const initialize = (appName, opts) => {
  if (!appName.length) {
    return installFailed('Initialize failed, please add name of your Project.', spinner);
  }

  // Get Formatted appName
  const nameFormatted = appName.join(' ').replace(/(-|\s)/g, '_');

  if (existsSync(`./${nameFormatted}`)) {
    return installFailed('Initialize failed, name of your Project already exist.', spinner);
  }

  const options = {
    typescript: !!opts.typescript,
    sass: !!opts.sass,
    class: !!opts.class
  };

  createProject(nameFormatted, options);
};

module.exports = initialize;
