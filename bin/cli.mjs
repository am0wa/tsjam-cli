#!/usr/bin/env node --experimental-modules
import addReact from './add-react.mjs';
import addTsjam from './add-tsjam.mjs';

import colors from 'yoctocolors';

import addJest from './add-jest.mjs';
import addWebpack from './add-webpack.mjs';

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
('use strict');

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const cmd = {
  help: '--help',
  addWebpack: '--add-webpack',
  addReact: '--add-react',
  addTsjam: '--add-tsjam',
  addJest: '--add-jest',
};

const help = [cmd.help, cmd.addTsjam, cmd.addJest, cmd.addReact, cmd.addWebpack];

const proceed = () => {
  const args = process.argv.slice(2);

  if (args.includes(cmd.addWebpack)) {
    console.info(colors.green('Adding webpack...📦'));
    addWebpack();
    return;
  }

  if (args.includes(cmd.addReact)) {
    console.info(colors.green('Adding react...⚛️'));
    addReact();
    return;
  }

  if (args.includes(cmd.addTsjam)) {
    console.info(colors.green('Adding tsjam...🍰'));
    addTsjam();
    return;
  }

  if (args.includes(cmd.addJest)) {
    console.info(colors.green('Adding jest...🔬'));
    addJest();
    return;
  }

  console.info(colors.green(`tsjam-cli commands:\n\t${colors.blue(help.join('\n\t'))}`));
};

proceed();
