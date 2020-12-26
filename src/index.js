import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import render from './formatters/index.js';

const extractData = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const dataType = path.extname(filePath).slice(1);
  return parse(raw, dataType);
};

export default (pathToFile1, pathToFile2, outputFormat = 'json', color = false) => {
  const data1 = extractData(pathToFile1);
  const data2 = extractData(pathToFile2);
  const diff = buildDiff(data1, data2);
  return render(diff, outputFormat, color);
};
