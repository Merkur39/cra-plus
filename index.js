#!/usr/bin/env node

const { existsSync } = require('fs');
const program = require('commander');
const { exit } = require('shelljs');
const ora = require('ora');
const spinner = ora();
spinner.color = 'green';
spinner.spinner = 'dots';

const package = require('./package.json');
const addCreateReactApp = require('./packages/addCreateReactApp');
const addCommit = require('./packages/addCommit');
const restructuring = require('./commandLines/restructuring');
const addSass = require('./packages/addSass');
const addTypescript = require('./packages/addTypescript');
const addComponent = require('./commandLines/addComponent');
const addService = require('./commandLines/addService');
const addInterface = require('./commandLines/addInterface');

const { formatingFileName, stopGenerateClass } = require('./libs/utils');
const { installProjectSuccess, installFailed } = require('./libs/messages');

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

// Create App
program
  .version(`v${package.version}`)
  .command('new [appName...]')
  .description('Create new Application')
  .option('--typescript', 'Generate Typescript Application')
  .option('--sass', 'With Preprocessor SASS')
  .option(
    '--class',
    'Generate Application with Class Component, the future Components will be created with Classes.'
  )
  .action((appName, opts) => initialize(appName, opts));

// Create Page Component
program
  .command('page [component...]')
  .alias('p')
  .description('Create new Page Component')
  .option('--skipTests', 'Do not create test file for this Page Component')
  .option('--class', 'Create Class Component')
  .action((componentName, opts) => addComponent(formatingFileName(componentName), opts, true));

// Create Component
program
  .command('component [component...]')
  .alias('c')
  .description('Create new Component')
  .option('--skipTests', 'Do not create test file for this Component')
  .option('--class', 'Create Class Component')
  .action((componentName, opts) => addComponent(formatingFileName(componentName), opts, false));

// Create Service
program
  .command('service [name...]')
  .alias('s')
  .description('Create new Service')
  .option('--skipTests', 'Do not create test file for this Service')
  .action((serviceName, opts) => addService(formatingFileName(serviceName), opts));

// Create Interface (If Typescript project)
program
  .command('interface [name...]')
  .alias('i')
  .description('Create new Interface')
  .action(interfaceName => addInterface(formatingFileName(interfaceName)));

// Stop generate class component
program
  .command('stopClass')
  .description(
    'If Application was created with the "--class" command, the future Components created will no longer be Classes.'
  )
  .action(stopGenerateClass);

program.parse(process.argv);
