const childProcess = require('child_process');

/**
 * @param command {string}
 * @return {string}
 */
const exec = (command) => {
  try {
    return childProcess.execSync(command).toString().trim();
  } catch {
    console.error(`Command '${command}' can't be executed.`);
  }

  return '';
};

module.exports = {
  exec,
};
