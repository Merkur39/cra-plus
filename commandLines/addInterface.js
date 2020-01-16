const { existsSync, readdirSync } = require('fs');
const { mkdir, touch, ShellString } = require('shelljs');
const { installFailed, installSuccess, wrongPlace } = require('../libs/messages');
const { getConfig } = require('../libs/utils');
const { newInterfaceTS } = require('../templates/templateTS');
const { newInterfaceJS } = require('../templates/templateJS');

const createNewInterface = (interfaceName, config) => {
  return new Promise(resolve => {
    const commands = [];

    if (!existsSync(`./src/interfaces`)) {
      commands.push(mkdir('-p', `src/interfaces`));
    }

    commands.push(touch('-c', `src/interfaces/${interfaceName}.interface.ts`));

    commands.push(
      ShellString(
        config.withTS ? newInterfaceTS(interfaceName) : newInterfaceJS(interfaceName)
      ).toEnd(`src/interfaces/${interfaceName}.interface.ts`)
    );

    for (const command of commands) {
      if (command.code !== 0 && command.stderr !== undefined) {
        installFailed(`${command.stderr}`);
      }
    }

    installSuccess(interfaceName, 'Interface');
    resolve();
  });
};

const initNewInterface = async interfaceName => {
  const isRightPlace =
    existsSync('./package.json') &&
    existsSync('./crapConfig.json') &&
    (existsSync('./src/index.jsx') || existsSync('./src/index.tsx'));

  const regex = new RegExp(interfaceName);
  let interfacesNameAlreadyExist = null;
  if (existsSync('./src/interfaces')) {
    interfacesNameAlreadyExist = readdirSync('./src/interfaces').find(f => f.match(regex));
  }

  if (!isRightPlace) {
    return wrongPlace();
  }
  if (interfacesNameAlreadyExist) {
    return installFailed(
      `Creation failed, interfaces/${interfaceName}.interface.ts name already exists.`
    );
  }

  const config = getConfig();
  if (!config) {
    return installFailed('Configuration file "CrapConfig.json" not found');
  }

  if (!config.withTS) {
    return installFailed('Create Interface works only with a Typescript project');
  }

  return await createNewInterface(interfaceName, config);
};

module.exports = initNewInterface;
