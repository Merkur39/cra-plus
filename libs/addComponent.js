const { existsSync } = require('fs');
const { cat, mkdir, ShellString, touch } = require('shelljs');
const log = require('./cliColors');
const {
  newComponentTS,
  newComponentTestTS,
  newComponentClassTS
} = require('../templates/templateTS');
const {
  newComponentJS,
  newComponentTestJS,
  newComponentClassJS
} = require('../templates/templateJS');
const { newComponentCSS } = require('../templates/templateCSS');
const { addImportSCSS, newComponentSCSS } = require('../templates/templateSass');
const { installFailed, installComponentSuccess } = require('./messages');
const { getConfig } = require('./utils');

const createNewComponent = async (componentName, opts) => {
  return new Promise(resolve => {
    const config = getConfig();
    if (!config) {
      return installFailed('Configuration file "CrapConfig.json" not found');
    }

    const commands = [];

    // Create component directory and files needed
    commands.push(
      mkdir('-p', `src/components/${componentName}`),

      touch('-c', [
        `src/components/${componentName}/${componentName}.component.${config.component}`,
        `src/components/${componentName}/${componentName}.style.${config.style}`
      ])
    );

    if (!opts.skipTests) {
      commands.push(
        touch('-c', [`src/components/${componentName}/${componentName}.test.${config.component}`]),

        ShellString(
          config.withTS ? newComponentTestTS(componentName) : newComponentTestJS(componentName)
        ).to(`src/components/${componentName}/${componentName}.test.${config.component}`)
      );
    }

    commands.push(
      ShellString(
        config.withTS
          ? opts.class
            ? newComponentClassTS(componentName, config.withSass)
            : newComponentTS(componentName, config.withSass)
          : opts.class
          ? newComponentClassJS(componentName, config.withSass)
          : newComponentJS(componentName, config.withSass)
      ).to(`src/components/${componentName}/${componentName}.component.${config.component}`),

      ShellString(
        config.withSass ? newComponentSCSS(componentName) : newComponentCSS(componentName)
      ).to(`src/components/${componentName}/${componentName}.style.${config.style}`)
    );

    if (config.withSass) {
      const importAlreadyExist = cat('src/index.scss').includes(addImportSCSS(componentName));

      if (!importAlreadyExist) {
        commands.push(ShellString(addImportSCSS(componentName)).toEnd('src/index.scss'));
      }
    }

    // Print errors but continue install
    for (const command of commands) {
      if (command.code !== 0 && command.stderr !== undefined) {
        log.error(`${command.stderr}`);
      }
    }

    installComponentSuccess(componentName);
    resolve();
  });
};

const initNewComponent = async (componentName, opts) => {
  const options = {
    skipTests: opts.skipTests,
    class: opts.class
  };
  const isRightPlace =
    existsSync('./package.json') &&
    existsSync('./crapConfig.json') &&
    (existsSync('./src/index.jsx') || existsSync('./src/index.tsx')) &&
    existsSync('./src/components');
  const componentAlreadyExist = existsSync(`./src/components/${componentName}`);

  if (!isRightPlace) {
    return installFailed(
      'Project not found\nPlease verify your location and move on source project'
    );
  }
  if (componentAlreadyExist) {
    return installFailed(`A Component with the same name (${componentName}) already exists`);
  }
  return await createNewComponent(componentName, options);
};

module.exports = initNewComponent;
