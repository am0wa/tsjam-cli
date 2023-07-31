const { addReact } = require('./add-react');
const { addWebpack } = require('./add-webpack');

const cmd = {
  help: '--help',
  addWebpack: '--add-webpack',
  addReact: '--add-react',
};

const help = [cmd.help, cmd.addReact, cmd.addWebpack];

const proceed = () => {
  const args = process.argv.slice(2);

  if (args.includes(cmd.addWebpack)) {
    console.info('Adding webpack...');
    addWebpack();
    return;
  }

  if (args.includes(cmd.addReact)) {
    console.info('Adding react...');
    addReact();
    return;
  }

  console.info(`tsjam-cli commands:\n\t${help.join('\n\t')}`);
};

proceed();
