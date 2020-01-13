const { existsSync } = require('fs');
const { mkdir, touch, ShellString } = require('shelljs');
const log = require('./cliColors');
const { installFailed, installServiceSuccess } = require('./messages');
const { getConfig } = require('./utils');
const { newServiceTS, newServiceTestTS } = require('../templates/templateTS');
const { newServiceJS, newServiceTestJS } = require('../templates/templateJS');

const createNewService = (serviceName, servicesDirAlreadyExist, opts) => {
  return new Promise(resolve => {
    const config = getConfig();
    if (!config) {
      return installFailed('Configuration file "CrapConfig.json" not found');
    }

    const commands = [];

    if (!servicesDirAlreadyExist) {
      commands.push(mkdir('-p', `src/services/${serviceName}`));
    }

    commands.push(
      touch('-c', `src/services/${serviceName}/${serviceName}.service.${config.logic}`)
    );

    if (!opts.skipTests) {
      commands.push(
        touch('-c', `src/services/${serviceName}/${serviceName}.test.${config.logic}`),
        ShellString(
          config.withTS ? newServiceTestTS(serviceName) : newServiceTestJS(serviceName)
        ).toEnd(`src/services/${serviceName}/${serviceName}.test.${config.logic}`)
      );
    }
    commands.push(
      ShellString(config.withTS ? newServiceTS(serviceName) : newServiceJS(serviceName)).toEnd(
        `src/services/${serviceName}/${serviceName}.service.${config.logic}`
      )
    );

    // Print errors but continue install
    for (const command of commands) {
      if (command.code !== 0 && command.stderr !== undefined) {
        log.error(`${command.stderr}`);
      }
    }

    installServiceSuccess(serviceName);
    resolve();
  });
};

const initNewService = async (serviceName, opts) => {
  const options = {
    skipTests: !!opts.skipTests
  };
  const isRightPlace =
    existsSync('./package.json') &&
    existsSync('./crapConfig.json') &&
    (existsSync('./src/index.jsx') || existsSync('./src/index.tsx'));

  const servicesDirAlreadyExist = existsSync(`./src/services`);
  const servicesNameAlreadyExist = existsSync(`./src/services/${serviceName}`);

  if (!isRightPlace) {
    return installFailed(
      'Project not found\nPlease verify your location and move on source project'
    );
  }
  if (servicesNameAlreadyExist) {
    return installFailed(`Creation failed, name of your Service (${serviceName}) already exists.`);
  }

  return await createNewService(serviceName, servicesDirAlreadyExist, options);
};

module.exports = initNewService;
