const { existsSync } = require('fs');
const { mkdir, touch, ShellString } = require('shelljs');
const { installFailed, installSuccess, wrongPlace } = require('../libs/messages');
const { getConfig } = require('../libs/utils');
const { newServiceTS, newServiceTestTS } = require('../templates/templateTS');
const { newServiceJS, newServiceTestJS } = require('../templates/templateJS');

const createNewService = (serviceName, opts, config) => {
  return new Promise(resolve => {
    const commands = [];

    if (!existsSync(`./src/services`)) {
      commands.push(mkdir('-p', `src/services`));
    }

    commands.push(
      mkdir('-p', `src/services/${serviceName}`),
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

    for (const command of commands) {
      if (command.code !== 0 && command.stderr !== undefined) {
        installFailed(command.stderr);
      }
    }

    installSuccess(serviceName, 'Service');
    resolve();
  });
};

const initNewService = async (serviceName, opts) => {
  const isRightPlace =
    existsSync('./package.json') &&
    existsSync('./crapConfig.json') &&
    (existsSync('./src/index.jsx') || existsSync('./src/index.tsx'));

  const servicesNameAlreadyExist = existsSync(`./src/services/${serviceName}`);

  if (!isRightPlace) {
    return wrongPlace();
  }
  if (servicesNameAlreadyExist) {
    return installFailed(`Creation failed, services/${serviceName} name already exists.`);
  }

  const config = getConfig();
  if (!config) {
    return installFailed('Configuration file "CrapConfig.json" not found');
  }

  const options = {
    skipTests: !!opts.skipTests
  };

  return await createNewService(serviceName, options, config);
};

module.exports = initNewService;
