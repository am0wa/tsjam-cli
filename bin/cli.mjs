#!/usr/bin/env node --experimental-modules

/**
 * Copyright (c) 2023-present, am0wa.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import addReact from './add-react.mjs';
import addTsjam from './add-tsjam.mjs';

import addJest from './add-jest.mjs';
import addWebpack from './add-webpack.mjs';

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
    console.info('Adding webpack...📦');
    addWebpack();
    return;
  }

  if (args.includes(cmd.addReact)) {
    console.info('Adding react...⚛️');
    addReact();
    return;
  }

  if (args.includes(cmd.addTsjam)) {
    console.info('Adding tsjam...🍰');
    addTsjam();
    return;
  }

  if (args.includes(cmd.addJest)) {
    console.info('Adding jest...🔬');
    addJest();
    return;
  }

  console.info(`tsjam-cli commands:\n\t${help.join('\n\t')}`);
};

proceed();
