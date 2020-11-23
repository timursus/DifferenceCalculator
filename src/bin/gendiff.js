#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index.js';

program
  .version('0.3.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format [pretty, plain, json]', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
