const inquirer = require('inquirer');

/**
 * Replace space to CamelCase on string
 * @param {String} str
 * @returns
 */
const formatingName = str => {
  const newStr = str
    .toLowerCase()
    .replace(
      /(\w+)(?:\s+|$)/g,
      (_, txt) => `${txt.charAt(0).toUpperCase()}${txt.substr(1)}`
    );
  return `${newStr.charAt(0).toLowerCase()}${newStr.substr(1)}`;
};

const projectName = () => {
  return inquirer.prompt({
    name: 'project_name',
    type: 'input',
    message: 'What is the name of the app ?',
    filter: value => value.replace(/\s/g, '_').toLowerCase()
  });
};

const useTypescript = () => {
  return inquirer.prompt({
    name: 'ts',
    type: 'confirm',
    message: 'Use Typescript ?',
    default: true
  });
};

const useSass = () => {
  return inquirer.prompt({
    name: 'sass',
    type: 'confirm',
    message: 'Use Sass ?',
    default: true
  });
};

module.exports = { projectName, useTypescript, useSass };
