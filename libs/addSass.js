const shell = require('shelljs');
const chalk = require('chalk');

const addSass = async (withTS, spinner) => {
  spinner.start('Install node-sass');
  return new Promise((resolve, reject) => {
    shell.exec(`npm install node-sass`, { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        spinner.stop();
        shell.echo(chalk.red.bold(`${stderr}`));
        shell.exit(1);
      } else {
        // Rename files
        shell.mv('src/index.css', 'src/index.scss');
        shell.mv('src/components/App/App.style.css', 'src/components/App/App.style.scss');
        // Change import location in index & App
        if (!withTS) {
          shell.sed('-i', './index.css', './index.scss', 'src/index.js');
          shell.sed('-i', './App.style.css', './App.style.scss', 'src/components/App/App.component.js');
        } else {
          shell.sed('-i', './index.css', './index.scss', 'src/index.tsx');
          shell.sed('-i', './App.style.css', './App.style.scss', 'src/components/App/App.component.tsx');
        }
        spinner.succeed();
        return resolve(stdout);
      }
    });
  });
};

module.exports = addSass;
