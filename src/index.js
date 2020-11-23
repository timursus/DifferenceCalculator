import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildDiff from './buildDiff';
import render from './formatters';

const extractData = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const dataType = path.extname(filePath).slice(1);
  return parse(raw, dataType);
};

export default (pathToFile1, pathToFile2, outputFormat = 'json') => {
  const data1 = extractData(pathToFile1);
  const data2 = extractData(pathToFile2);
  const diff = buildDiff(data1, data2);
  return render(diff, outputFormat);
};
