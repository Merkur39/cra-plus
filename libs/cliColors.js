const { echo } = require('shelljs');
const chalk = require('chalk');

const log = {
  multiple: args => echo(args.map(arg => chalk[arg.color].bold(arg.str))),
  info: (str, color = 'white') => echo(chalk[color].bold(str)),
  success: str => echo(chalk.green.bold(str)),
  warning: str => echo(chalk.yellow.bold(str)),
  error: str => echo(chalk.red.bold(str))
};

module.exports = log;
