import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedJSON = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  + verbose: true\n  - proxy: 123.234.53.22\n  - follow: false\n}';
const expectedYAML = '{\n    node: true\n  + extends: plugin:jest/recommended\n  - extends: airbnb-base\n  + jest: true\n  + parser: babel-eslint\n  - ecmaVersion: 2018\n}';
const expectedINI = '{\n    StatusPort: 6090\n  + DetailedLog: false\n  - DetailedLog: true\n  + Archive: 1\n  - StatusRefresh: 10\n  - RunStatus: 1\n}';

test.each([
  ['before.json', 'after.json', expectedJSON],
  ['bg.yml', 'gd.yml', expectedYAML],
  ['config.ini', 'modified.ini', expectedINI],
])('Comparsion of files %p %p', (configA, configB, expectedOutput) => {
  const pathA = getFixturePath(configA);
  const pathB = getFixturePath(configB);
  expect(genDiff(pathA, pathB)).toBe(expectedOutput);
});
