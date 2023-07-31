#!/usr/bin/env node

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const addReact = require('./add-react');
const addWebpack = require('./add-webpack');

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
