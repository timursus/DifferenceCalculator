import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import renderer from './formatters';

const getDifference = (dataBefore, dataAfter) => {
  const keys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  return keys.sort().map((key) => {
    const [valueOld, valueNew] = [dataBefore[key], dataAfter[key]];

    if (!_.has(dataBefore, key) || !_.has(dataAfter, key)) {
      return {
        key, valueOld, valueNew, status: _.has(dataAfter, key) ? 'added' : 'deleted',
      };
    }

    if (_.isPlainObject(valueOld) && _.isPlainObject(valueNew)) {
      return { key, children: getDifference(valueOld, valueNew) };
    }

    return {
      key, valueOld, valueNew, status: (valueOld === valueNew) ? 'unchanged' : 'changed',
    };
  });
};

export default (pathToFile1, pathToFile2, format) => {
  const data1 = fs.readFileSync(pathToFile1, 'utf8');
  const data2 = fs.readFileSync(pathToFile2, 'utf8');
  const extension = path.extname(pathToFile1);
  const [parsedData1, parsedData2] = [parse(data1, extension), parse(data2, extension)];
  const diff = getDifference(parsedData1, parsedData2);
  return renderer(diff, format);
};
