#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const ora = require('ora');
const spinner = ora();
spinner.color = 'green';
spinner.spinner = 'dots';

const addCreateReactApp = require('./libs/addCreateReactApp');
const addMaterial = require('./libs/addMaterial');
const addRedux = require('./libs/addRedux');
const addRouter = require('./libs/addRouter');
const addSass = require('./libs/addSass');
const addCommit = require('./libs/addCommit');
const restructuring = require('./libs/restructuring');

const init = () => {
  shell.echo(
    chalk.green(
      figlet.textSync('REACT  STARTER', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

const sendMessage = createdProjectMessage => {
  shell.echo(chalk.green.bold(`Done! ${createdProjectMessage}`));
};

const askQuestions = () => {
  const questions = [
    {
      name: 'PROJECT_NAME',
      type: 'input',
      message: 'What is the name of the app ?',
      validate: value => {
        const pass = value.match(/^\S+$/g);
        if (pass) return true;
        return 'Please enter a valid name project (without-space)';
      }
    },
    {
      name: 'LANGUAGES',
      type: 'list',
      message: 'Select your language:',
      choices: ['Javascript', 'Typescript'],
      filter: val => {
        return val === 'Typescript' ? true : false;
      }
    },
    {
      name: 'PACKAGES',
      type: 'checkbox',
      message: 'Select your packages:',
      choices: [{ name: 'Material-ui' }, { name: 'Router-dom' }, { name: 'Redux' }, { name: 'Sass' }]
    }
  ];
  return inquirer.prompt(questions);
};

const createProject = async (projectName, languages, packages) => {
  const createApp = await addCreateReactApp(projectName, languages, spinner);

  await restructuring(projectName, languages, spinner);

  for (let i = 0; i < packages.length; i++) {
    switch (packages[i]) {
      case 'Material-ui':
        await addMaterial(spinner);
        break;

      case 'Router-dom':
        await addRouter(spinner);
        break;

      case 'Redux':
        await addRedux(spinner);
        break;

      case 'Sass':
        await addSass(languages, spinner);
        break;

      default:
        break;
    }
  }
  return createApp;
};

const run = async () => {
  // Show Intro
  init();

  // Ask Question
  const answers = await askQuestions();
  const { PROJECT_NAME, LANGUAGES, PACKAGES } = answers;

  // Create Project
  const createdProjectMessage = await createProject(PROJECT_NAME, LANGUAGES, PACKAGES);

  // New commit after customization
  await addCommit(spinner);

  if (spinner.isSpinning) {
    spinner.stop();
  }
  // show success message
  sendMessage(createdProjectMessage);
  shell.exit(0);
};

run();
