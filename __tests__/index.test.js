import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('comparison of flat JSON files', () => {
  const expectedOutput = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  + verbose: true\n  - proxy: 123.234.53.22\n  - follow: false\n}';
  const beforePath = getFixturePath('before.json');
  const afterPath = getFixturePath('after.json');
  expect(genDiff(beforePath, afterPath)).toBe(expectedOutput);

  const emptyPath = getFixturePath('empty.json');
  expect(genDiff(emptyPath, afterPath)).toBe('{\n  + timeout: 20\n  + verbose: true\n  + host: hexlet.io\n}');
});

test('comparison of flat YAML files', () => {
  const expectedOutput = '{\n    node: true\n  + extends: plugin:jest/recommended\n  - extends: airbnb-base\n  + jest: true\n  + parser: babel-eslint\n  - ecmaVersion: 2018\n}';
  const bgPath = getFixturePath('bg.yml');
  const gdPath = getFixturePath('gd.yml');
  expect(genDiff(bgPath, gdPath)).toBe(expectedOutput);
});
