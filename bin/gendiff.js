#!/usr/bin/env node

import program from 'commander';
import gendiff from '../src/index.js';

program
  .version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format [pretty, plain, json]', 'pretty')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
