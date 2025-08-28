#!/usr/bin/env node --experimental-modules
import childProcess from 'child_process';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { resolve, join as joinPath } from 'path';

const exec = (command) => childProcess.execSync(command).toString().trim();

const targetPkgPath = joinPath(process.cwd(), '/package.json');
// console.debug('BuildInfo::target', targetPkgPath);

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Please pass the $out you want to write build info!');
  process.exit(1);
}

const [out] = args;
const dist = resolve(process.cwd(), out);
// console.debug('BuildInfo::dist', dist);

const buildInfoDist = joinPath(dist, '/build.json');

const buildInfo = async () => {
  const targetPkg = await readFile(targetPkgPath, 'utf8').then(JSON.parse);

  const info = {
    name: targetPkg.name,
    version: targetPkg.version,
    hash: exec('git rev-parse --short HEAD'),
    timestamp: Date.now(),
  };

  await mkdir(dist, { recursive: true });

  await writeFile(buildInfoDist, JSON.stringify(info, null, 2));
};

buildInfo();
