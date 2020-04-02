import fs from 'fs';
import _ from 'lodash';

const getDifference = (json1, json2) => {
  const [object1, object2] = [JSON.parse(json1), JSON.parse(json2)];
  const [keys1, keys2] = [Object.keys(object1), Object.keys(object2)];

  const commonKeys = _.intersection(keys1, keys2);
  const unchanged = commonKeys
    .filter((key) => object1[key] === object2[key])
    .map((key) => `    ${key}: ${object1[key]}`);
  const changed = commonKeys
    .filter((key) => object1[key] !== object2[key])
    .map((key) => `  + ${key}: ${object2[key]}\n  - ${key}: ${object1[key]}`);

  const added = _.difference(keys2, keys1).map((key) => `  + ${key}: ${object2[key]}`);
  const deleted = _.difference(keys1, keys2).map((key) => `  - ${key}: ${object1[key]}`);

  return `{\n${unchanged.concat(changed, added, deleted).join('\n')}\n}`;
};

export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');
  return getDifference(file1, file2);
};
