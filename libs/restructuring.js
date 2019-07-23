const shell = require('shelljs');
const chalk = require('chalk');

const restructuring = async (projectName, withTS, spinner) => {
  spinner.start('Restructuring');
  return new Promise((resolve, reject) => {
    const commands = [];

    // Move to project
    commands.push(shell.cd(`${projectName}`));
    // Create folders
    commands.push(shell.mkdir('-p', `src/components/App`));

    if (!withTS) {
      // Rename files
      commands.push(shell.mv('src/App.js', 'src/App.component.js'));
      commands.push(shell.mv('src/App.css', 'src/App.style.css'));
      // Move files
      commands.push(
        shell.mv(
          ['src/App.component.js', 'src/App.test.js', 'src/App.style.css'],
          'src/components/App/'
        )
      );
      // Change import location in index & App
      commands.push(
        shell.sed(
          '-i',
          './App',
          './components/App/App.component',
          'src/index.js'
        )
      );
      commands.push(
        shell.sed(
          '-i',
          './App',
          './components/App/App.component',
          'src/components/App/App.test.js'
        )
      );
      commands.push(
        shell.sed(
          '-i',
          './App.css',
          './App.style.css',
          'src/components/App/App.component.js'
        )
      );
      commands.push(
        shell.sed(
          '-i',
          './logo.svg',
          '../../logo.svg',
          'src/components/App/App.component.js'
        )
      );
    } else {
      // Rename files
      commands.push(shell.mv('src/App.tsx', 'src/App.component.tsx'));
      commands.push(shell.mv('src/App.css', 'src/App.style.css'));
      // Move files
      commands.push(
        shell.mv(
          ['src/App.component.tsx', 'src/App.test.tsx', 'src/App.style.css'],
          'src/components/App/'
        )
      );
      // Change import location in index & App
      commands.push(
        shell.sed(
          '-i',
          './App',
          './components/App/App.component',
          'src/index.tsx'
        )
      );
      commands.push(
        shell.sed(
          '-i',
          './App',
          './components/App/App.component',
          'src/components/App/App.test.tsx'
        )
      );
      commands.push(
        shell.sed(
          '-i',
          './App.css',
          './App.style.css',
          'src/components/App/App.component.tsx'
        )
      );
      commands.push(
        shell.sed(
          '-i',
          './logo.svg',
          '../../logo.svg',
          'src/components/App/App.component.tsx'
        )
      );
    }

    // Print errors but continue install
    for (const command of commands) {
      if (command.code !== 0) {
        shell.echo(chalk.red.bold(`${command.stderr}`));
      }
    }

    spinner.succeed();
    resolve(commands);
  });
};

module.exports = restructuring;
