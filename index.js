#!/usr/bin/env node

const program = require('commander');
const ceateProject = require('./commandLines/createProject');
const package = require('./package.json');
const addComponent = require('./commandLines/addComponent');
const addService = require('./commandLines/addService');
const addInterface = require('./commandLines/addInterface');
const addHook = require('./commandLines/addHook');
const { formatingFileName, stopGenerateClass } = require('./libs/utils');

// Create App
program
  .version(`v${package.version}`)
  .command('new [appName...]')
  .description('Create new Application')
  .option('--typescript', 'Generate Typescript Application')
  .option('--sass', 'With Preprocessor SASS')
  .option('--class', 'Generate Application with Class Component, the future Components will be created with Classes.')
  .action((appName, opts) => ceateProject(appName, opts));

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
  .action((serviceName, opts) => addService(formatingFileName(serviceName, false), opts));

// Create Interface (If Typescript project)
program
  .command('interface [name...]')
  .alias('i')
  .description('Create new Interface')
  .action((interfaceName) => addInterface(formatingFileName(interfaceName, false)));

// Create Hooks
program
  .command('hook [name...]')
  .alias('h')
  .description('Create new Hook')
  .action((hookName) => addHook(formatingFileName(hookName)));

// Stop generate class component
program
  .command('stopClass')
  .description('If Application was created with the "--class" command, the future Components created will no longer be Classes.')
  .action(stopGenerateClass);

program.parse(process.argv);
