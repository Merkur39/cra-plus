const { installFailed } = require('./messages');
const { exit, ShellString } = require('shelljs');
const crapConfig = require('../templates/templateCrapConfig');
const log = require('./log');

/**
 * Capitalize string
 * @param {String} str
 */
const capitalize = str => {
  if (typeof str !== 'string') {
    return `${str} is not a type string`;
  }
  return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
};

/**
 * Replace space to CamelCase
 * @param {String} str
 * @returns
 */
const formatingFileName = str => {
  if (typeof str !== 'string' && typeof str === 'object' && typeof str[0] !== 'string') {
    installFailed(`${str} is not a type string`);
    exit(1);
  }

  let nameFormatted;
  if (typeof str === 'object' && typeof str[0] === 'string') {
    nameFormatted = str.join(' ').replace(/(_|-|\s)/g, ' ');
  }

  return (nameFormatted || str).replace(
    /(\w+)(?:\s+|$)/g,
    (_, txt) => `${txt.charAt(0).toUpperCase()}${txt.substr(1)}`
  );
};

/**
 * Get project configuration
 * @param {boolean} full "true" or nothing return full configuration | "false" return just crapConfig file
 */
const getConfig = (full = true) => {
  const config = require(process.cwd() + '/crapConfig.json');

  if (config) {
    const crapConfig = {
      projectName: config.project.projectName,
      withTS: config.project.withTS,
      withSass: config.project.withSass,
      withClass: config.project.withClass
    };
    const extensionFileConfig = {
      logic: config.project.withTS ? 'ts' : 'js',
      component: config.project.withTS ? 'tsx' : 'jsx',
      style: config.project.withSass ? 'scss' : 'css'
    };

    if (full) {
      return { ...crapConfig, ...extensionFileConfig };
    }

    return crapConfig;
  }
  return null;
};

const stopGenerateClass = () => {
  const config = getConfig(false);

  if (config && config.withClass) {
    config.withClass = false;
    ShellString(crapConfig(config)).to('crapConfig.json');
    log.multiple([
      { color: 'green', str: '\nSuccess!' },
      { color: 'white', str: 'Configuration file has been changed' }
    ]);
  }
};

module.exports = { capitalize, getConfig, formatingFileName, stopGenerateClass };
