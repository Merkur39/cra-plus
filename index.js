#!/usr/bin/env node

const { existsSync } = require('fs');
const program = require('commander');
const { exit } = require('shelljs');
const ora = require('ora');
const spinner = ora();
spinner.color = 'green';
spinner.spinner = 'dots';

const package = require('./package');
const addCreateReactApp = require('./libs/addCreateReactApp');
const addCommit = require('./libs/addCommit');
const restructuring = require('./libs/restructuring');
const addSass = require('./libs/addSass');
const addTypescript = require('./libs/addTypescript');
const addComponent = require('./libs/addComponent');
const addService = require('./libs/addService');
const { formatingFileName } = require('./libs/utils');
const { installProjectSuccess, installFailed } = require('./libs/messages');

const createProject = async (projectName, withTS, withSass) => {
  await addCreateReactApp(projectName, spinner);
  await restructuring(projectName, withTS, withSass, spinner);

  if (withSass) {
    await addSass(spinner, withTS);
  }
  if (withTS) {
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

const initialize = (name, opts) => {
  if (!name.length) {
    return installFailed('Initialize failed, please add name of your Project.', spinner);
  }

  // Get Formatted Name
  const nameFormatted = name.join(' ').replace(/(-|\s)/g, '_');

  if (existsSync(`./${nameFormatted}`)) {
    return installFailed('Initialize failed, name of your Project already exist.', spinner);
  }

  createProject(nameFormatted, !!opts.typescript, !!opts.sass);
};

// Create App
program
  .version(`v${package.version}`)
  .command('new [name...]')
  .description('Create New Application')
  .option('--typescript', 'Generate Typescript Application')
  .option('--sass', 'With Preprocessor SASS')
  .action(initialize);

// Create Component
program
  .command('component <component>')
  .alias('c')
  .description('Create new component')
  .option('--skipTests', 'Do not create test file for this component')
  .option('--class', 'Create class component')
  .action((componentName, opts) => addComponent(formatingFileName(componentName), opts));

// Create Service
program
  .command('service [name...]')
  .alias('s')
  .description('Create New Service')
  .option('--skipTests', 'Do not create test file for this service')
  .action((serviceName, opts) => addService(formatingFileName(serviceName), opts));

program.parse(process.argv);
