#!/usr/bin/env node

// let program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const ora = require('ora');
const spinner = ora();
spinner.color = 'green';
spinner.spinner = 'dots';

const { projectName, useTypescript, useSass } = require('./libs/choices');
// const packagesList = require('./constants/packages');
const addCreateReactApp = require('./libs/addCreateReactApp');
const addCommit = require('./libs/addCommit');
const restructuring = require('./libs/restructuring');
const addSass = require('./libs/addSass');
const addTypescript = require('./libs/addTypescript');

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

const createProject = async (projectName, withTS, withSass) => {
  const createApp = await addCreateReactApp(projectName, withTS, spinner);

  if (withSass) {
    await addSass(spinner, withTS);
  }
  if (withTS) {
    await addTypescript(spinner);
  }

  await restructuring(projectName, withTS, withSass, spinner);

  return createApp;
};

const run = async () => {
  let createdProjectMessage;

  // Show Intro
  init();

  // Get Choices
  const { project_name } = await projectName();
  const { ts } = await useTypescript();
  const { sass } = await useSass();

  createdProjectMessage = await createProject(project_name, ts, sass);

  // New commit after customization
  // await addCommit(spinner, project_name);

  if (spinner.isSpinning) {
    spinner.stop();
  }
  // show success message
  sendMessage(createdProjectMessage);
  shell.exit(0);
};

run();

// program
//   .command('gc <component>')
//   .option('-n, --nofolder', 'Do not wrap component in folder')
//   .option('-s, --style', 'With stylesheet')
//   .option('-cl, --class', 'Create class component')
//   .action(createComponent);

// program.parse(process.argv);
