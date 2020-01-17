const { existsSync, readdirSync } = require('fs');
const { mkdir, touch, ShellString } = require('shelljs');
const { installFailed, installSuccess, wrongPlace } = require('../libs/messages');
const { getConfig } = require('../libs/utils');
const { newHookTS } = require('../templates/templateTS');
const { newHookJS } = require('../templates/templateJS');

const createNewHook = (hookName, config) => {
  return new Promise(resolve => {
    const commands = [];

    if (!existsSync(`./src/hooks`)) {
      commands.push(mkdir('-p', `src/hooks`));
    }

    commands.push(touch('-c', `src/hooks/${hookName}.${config.logic}`));

    commands.push(
      ShellString(config.withTS ? newHookTS(hookName) : newHookJS(hookName)).toEnd(
        `src/hooks/${hookName}.${config.logic}`
      )
    );

    for (const command of commands) {
      if (command.code !== 0 && command.stderr !== undefined) {
        installFailed(`${command.stderr}`);
      }
    }

    installSuccess(hookName, 'Hook');
    resolve();
  });
};

const initNewHook = async hookName => {
  const isRightPlace =
    existsSync('./package.json') &&
    existsSync('./crapConfig.json') &&
    (existsSync('./src/index.jsx') || existsSync('./src/index.tsx'));

  const hName = hookName.toLowerCase();
  const regex = new RegExp(hName);
  let hNameAlreadyExist = null;
  if (existsSync('./src/hooks')) {
    hNameAlreadyExist = readdirSync('./src/hooks').find(f => f.match(regex));
  }

  if (!isRightPlace) {
    return wrongPlace();
  }
  if (hNameAlreadyExist) {
    return installFailed(`Creation failed, hooks/${hName} name already exists.`);
  }

  const config = getConfig();
  if (!config) {
    return installFailed('Configuration file "CrapConfig.json" not found');
  }

  return await createNewHook(hName, config);
};

module.exports = initNewHook;
