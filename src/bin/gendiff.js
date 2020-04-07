#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index.js';

program
  .version('0.0.4')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'json')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
