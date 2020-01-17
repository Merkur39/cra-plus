const { existsSync } = require('fs');
const { cat, mkdir, ShellString, touch } = require('shelljs');
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
const { installFailed, installSuccess, wrongPlace } = require('../libs/messages');
const { getConfig } = require('../libs/utils');

const createNewComponent = async (componentName, opts, config) => {
  return new Promise(resolve => {
    const commands = [];

    // Create Component directory and files needed
    commands.push(
      mkdir('-p', `src/${opts.dir}/${componentName}`),

      touch('-c', [
        `src/${opts.dir}/${componentName}/${componentName}.component.${config.component}`,
        `src/${opts.dir}/${componentName}/${componentName}.style.${config.style}`
      ])
    );

    if (!opts.skipTests) {
      commands.push(
        touch('-c', [`src/${opts.dir}/${componentName}/${componentName}.test.${config.component}`]),

        ShellString(
          config.withTS ? newComponentTestTS(componentName) : newComponentTestJS(componentName)
        ).to(`src/${opts.dir}/${componentName}/${componentName}.test.${config.component}`)
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
      ).to(`src/${opts.dir}/${componentName}/${componentName}.component.${config.component}`),

      ShellString(
        config.withSass ? newComponentSCSS(componentName) : newComponentCSS(componentName)
      ).to(`src/${opts.dir}/${componentName}/${componentName}.style.${config.style}`)
    );

    if (config.withSass) {
      const importAlreadyExist = cat('src/styles/index.scss').includes(
        addImportSCSS(componentName, opts.dir)
      );

      if (!importAlreadyExist) {
        commands.push(
          ShellString(addImportSCSS(componentName, opts.dir)).toEnd('src/styles/index.scss')
        );
      }
    }

    for (const command of commands) {
      if (command.code !== 0 && command.stderr !== undefined) {
        installFailed(`${command.stderr}`);
      }
    }

    installSuccess(componentName, opts.dir === 'pages' ? 'Page' : 'Component');
    resolve();
  });
};

const initNewComponent = async (componentName, opts, isPage) => {
  const isRightPlace =
    existsSync('./package.json') &&
    existsSync('./crapConfig.json') &&
    (existsSync('./src/index.jsx') || existsSync('./src/index.tsx')) &&
    existsSync('./src/components');

  if (!isRightPlace) {
    return wrongPlace();
  }

  const config = getConfig();
  if (!config) {
    return installFailed('Configuration file "CrapConfig.json" not found');
  }
  const options = {
    dir: isPage ? 'pages' : 'components',
    skipTests: !!opts.skipTests,
    class: config.withClass || !!opts.class
  };
  const componentAlreadyExist = existsSync(`./src/${options.dir}/${componentName}`);

  if (componentAlreadyExist) {
    return installFailed(`Creation failed, ${options.dir}/${componentName} name already exists.`);
  }

  return await createNewComponent(componentName, options, config);
};

module.exports = initNewComponent;
