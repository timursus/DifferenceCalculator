#!/usr/bin/env node

import program from 'commander';
import gendiff from '../src/index.js';

program
  .version('1.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format [pretty, plain, json]', 'pretty')
  .option('--color', 'enable color highlighting for "pretty" or "plain" output')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.format, program.color));
  });

program.parse(process.argv);
