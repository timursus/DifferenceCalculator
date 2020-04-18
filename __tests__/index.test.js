import path from 'path';
import { readFileSync } from 'fs';
import mainFlow from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let prettyOutput;
let plainOutput;
let jsonOutput;

beforeAll(() => {
  prettyOutput = readFileSync(getFixturePath('pretty.txt'), 'utf-8');
  plainOutput = readFileSync(getFixturePath('plain.txt'), 'utf-8');
  jsonOutput = readFileSync(getFixturePath('json.txt'), 'utf-8');
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('Comparsion %p & %p', (configA, configB) => {
  const pathA = getFixturePath(configA);
  const pathB = getFixturePath(configB);

  expect(mainFlow(pathA, pathB, 'pretty')).toBe(prettyOutput);
  expect(mainFlow(pathA, pathB, 'plain')).toBe(plainOutput);
  expect(mainFlow(pathA, pathB, 'json')).toBe(jsonOutput);
});

test('Throws on incorrect input', () => {
  const txtPath = getFixturePath('json.txt');
  const path1yml = getFixturePath('before.yml');
  const path2yml = getFixturePath('after.yml');

  const runWithTxtFiles = () => mainFlow(txtPath, txtPath, 'json');
  const runWithJsFormat = () => mainFlow(path1yml, path2yml, 'js');

  expect(runWithTxtFiles).toThrowError('data type');
  expect(runWithJsFormat).toThrowError('format');
});
