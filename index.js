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
      message: 'What is the name of the app ?'
    },
    {
      name: 'CHOICES',
      type: 'checkbox',
      message: 'Select your choice:',
      choices: [{ name: 'Material-ui' }, { name: 'Router-dom' }, { name: 'Redux' }, { name: 'Sass' }]
    }
  ];
  return inquirer.prompt(questions);
};

const createProject = async (projectName, choices) => {
  const createApp = await addCreateReactApp(projectName, spinner);
  // Move to project
  shell.cd(`${projectName}`);
  // Create folders
  shell.mkdir('-p', `src/components/App`);
  // Rename files
  shell.mv('src/App.js', 'src/App.component.js');
  shell.mv('src/App.css', 'src/App.style.css');
  // Move files
  shell.mv(['src/App.component.js', 'src/App.test.js', 'src/App.style.css'], 'src/components/App/');
  // Change import location in index & App
  shell.sed('-i', './App', './components/App/App.component', 'src/index.js');
  shell.sed('-i', './App.css', './App.style.css', 'src/components/App/App.component.js');
  shell.sed('-i', './logo.svg', '../../logo.svg', 'src/components/App/App.component.js');

  for (let i = 0; i < choices.length; i++) {
    switch (choices[i]) {
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
        await addSass(spinner);
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
  const { PROJECT_NAME, CHOICES } = answers;

  // Create Project
  const createdProjectMessage = await createProject(PROJECT_NAME, CHOICES);
  if (spinner.isSpinning) {
    spinner.stop();
  }

  // show success message
  sendMessage(createdProjectMessage);
  shell.exit(0);
};

run();
