import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import render from './formatters';

const buildDiffTree = (dataBefore, dataAfter) => {
  const keys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  return keys.sort().map((key) => {
    const valueOld = dataBefore[key];
    const valueNew = dataAfter[key];

    if (!_.has(dataBefore, key)) {
      return { key, type: 'added', value: valueNew };
    }
    if (!_.has(dataAfter, key)) {
      return { key, type: 'deleted', value: valueOld };
    }

    if (_.isPlainObject(valueOld) && _.isPlainObject(valueNew)) {
      return {
        key, type: 'nested', children: buildDiffTree(valueOld, valueNew),
      };
    }

    return valueOld === valueNew
      ? { key, type: 'unchanged', value: valueOld }
      : {
        key, type: 'changed', value: valueNew, valueOld,
      };
  });
};

export default (pathToFile1, pathToFile2, format) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf8');
  const data2 = fs.readFileSync(pathToFile2, 'utf8');

  const dataType1 = path.extname(pathToFile1).slice(1);
  const dataType2 = path.extname(pathToFile2).slice(1);

  const parsedData1 = parse(data1, dataType1);
  const parsedData2 = parse(data2, dataType2);

  const diff = buildDiffTree(parsedData1, parsedData2);
  return render(diff, format);
};
