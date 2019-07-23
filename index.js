#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const ora = require('ora');
const spinner = ora();
spinner.color = 'green';
spinner.spinner = 'dots';

const {
  projectName,
  languages,
  templates,
  packages
} = require('./libs/choices');
const packagesList = require('./constants/packages');
const addCreateReactApp = require('./libs/addCreateReactApp');
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

const createProject = async (projectName, languages, packages = []) => {
  const createApp = await addCreateReactApp(projectName, languages, spinner);

  await restructuring(projectName, languages, spinner);

  for (let i = 0; i < packages.length; i++) {
    await packagesList[i].install(spinner, languages);
  }
  return createApp;
};

const run = async () => {
  let createdProjectMessage;

  // Show Intro
  init();

  // Get Choices
  const { PROJECT_NAME } = await projectName();
  const { LANGUAGES } = await languages();
  const { TEMPLATES } = await templates();

  switch (TEMPLATES) {
    case 1:
      createdProjectMessage = await createProject(PROJECT_NAME, LANGUAGES);
      break;
    case 2:
      const { PACKAGES } = await packages();
      createdProjectMessage = await createProject(
        PROJECT_NAME,
        LANGUAGES,
        PACKAGES
      );
      break;
    default:
      createdProjectMessage = await createProject(PROJECT_NAME, LANGUAGES);
      break;
  }

  // New commit after customization
  await addCommit(spinner, PROJECT_NAME);

  if (spinner.isSpinning) {
    spinner.stop();
  }
  // show success message
  sendMessage(createdProjectMessage);
  shell.exit(0);
};

run();
