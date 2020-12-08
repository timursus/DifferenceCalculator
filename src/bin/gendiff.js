#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index.js';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format [pretty, plain, json]', 'pretty')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
