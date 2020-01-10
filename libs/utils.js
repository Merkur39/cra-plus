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

module.exports = { capitalize, getConfig };
