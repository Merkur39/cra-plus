const { installFailed } = require('./messages');
const { exit } = require('shelljs');

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

  let serviceNameFormatted;
  if (typeof str === 'object' && typeof str[0] === 'string') {
    serviceNameFormatted = str.join(' ').replace(/(_|-|\s)/g, ' ');
  }

  const newStr = serviceNameFormatted.replace(
    /(\w+)(?:\s+|$)/g,
    (_, txt) => `${txt.charAt(0).toUpperCase()}${txt.substr(1)}`
  );

  return `${newStr.charAt(0).toLowerCase()}${newStr.substr(1)}`;
};

/**
 * Get project configuration in crapConfig.json file
 * If not exist, return null
 */
const getConfig = () => {
  const config = require(process.cwd() + '/crapConfig.json');

  if (config) {
    return {
      withTS: config.project.withTS,
      withSass: config.project.withSass,
      logic: config.project.withTS ? 'ts' : 'js',
      component: config.project.withTS ? 'tsx' : 'jsx',
      style: config.project.withSass ? 'scss' : 'css'
    };
  }
  return null;
};

module.exports = { capitalize, getConfig, formatingFileName };
