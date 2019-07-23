const inquirer = require('inquirer');
const templatesList = require('../constants/templatesList');
const packagesList = require('../constants/packages');

const projectName = () => {
  return inquirer.prompt({
    name: 'PROJECT_NAME',
    type: 'input',
    message: 'What is the name of the app ?',
    filter: value => {
      return value.replace(/\s/g, '_').toLowerCase();
    }
  });
};

const languages = () => {
  return inquirer.prompt({
    name: 'LANGUAGES',
    type: 'confirm',
    message: 'Use Typescript ? (default: No)',
    default: false
  });
};

const templates = () => {
  return inquirer.prompt({
    name: 'TEMPLATES',
    type: 'list',
    message: 'Select your template:',
    choices: templatesList
  });
};

const packages = () => {
  return inquirer.prompt({
    name: 'PACKAGES',
    type: 'checkbox',
    message: 'Select your packages:',
    choices: packagesList
  });
};

module.exports = { projectName, languages, templates, packages };
