const childProcess = require('child_process');

const exec = (command, cwd = process.cwd()) => {
  console.log('> Executing command:', command);
  try {
    const result = childProcess.execSync(command, { stdio: 'inherit', cwd });
    result && console.log('>> result:', result);
  } catch (err) {
    console.error(`Command '${command}' can't be executed.`, err);
  }
};

module.exports = {
  exec,
};
