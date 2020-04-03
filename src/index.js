import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getDifference = (config1, config2) => {
  const [keys1, keys2] = [Object.keys(config1), Object.keys(config2)];

  const commonKeys = _.intersection(keys1, keys2);
  const unchanged = commonKeys
    .filter((key) => config1[key] === config2[key])
    .map((key) => `    ${key}: ${config1[key]}`);
  const changed = commonKeys
    .filter((key) => config1[key] !== config2[key])
    .map((key) => `  + ${key}: ${config2[key]}\n  - ${key}: ${config1[key]}`);

  const added = _.difference(keys2, keys1).map((key) => `  + ${key}: ${config2[key]}`);
  const deleted = _.difference(keys1, keys2).map((key) => `  - ${key}: ${config1[key]}`);

  return `{\n${unchanged.concat(changed, added, deleted).join('\n')}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf8');
  const data2 = fs.readFileSync(pathToFile2, 'utf8');
  const extension = path.extname(pathToFile1);
  const [parsedData1, parsedData2] = [parse(data1, extension), parse(data2, extension)];
  return getDifference(parsedData1, parsedData2);
};
