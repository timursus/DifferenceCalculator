import path from 'path';
import { readFileSync } from 'fs';
import buildDiffTree from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const prettyOutput = readFileSync(getFixturePath('pretty.txt'), 'utf-8');
const plainOutput = readFileSync(getFixturePath('plain.txt'), 'utf-8');
const jsonOutput = readFileSync(getFixturePath('json.txt'), 'utf-8');

test.each([
  ['before.json', 'after.json', 'pretty', prettyOutput],
  ['before.json', 'after.json', 'plain', plainOutput],
  ['before.json', 'after.json', 'json', jsonOutput],
  ['before.yml', 'after.yml', 'pretty', prettyOutput],
  ['before.ini', 'after.ini', 'pretty', prettyOutput],
])('Comparsion of files %p & %p, output format: %s', (configA, configB, format, expected) => {
  const pathA = getFixturePath(configA);
  const pathB = getFixturePath(configB);
  expect(buildDiffTree(pathA, pathB, format)).toBe(expected);
});
