import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = [
  '{',
  '    common: {',
  '      + follow: false',
  '        setting1: Value 1',
  '      - setting2: 200',
  '      - setting3: true',
  '      + setting3: {',
  '            key: value',
  '        }',
  '      + setting4: blah blah',
  '      + setting5: {',
  '            key5: value5',
  '        }',
  '        setting6: {',
  '            key: value',
  '          + ops: vops',
  '        }',
  '    }',
  '    group1: {',
  '      - baz: bas',
  '      + baz: bars',
  '        foo: bar',
  '      - nest: {',
  '            key: value',
  '        }',
  '      + nest: str',
  '    }',
  '  - group2: {',
  '        abc: 12345',
  '        def: {',
  '            key: value',
  '        }',
  '    }',
  '  + group3: {',
  '        fee: 100500',
  '    }',
  '}',
].join('\n');

test.each([
  ['before.json', 'after.json', expected],
  ['before.yml', 'after.yml', expected],
  ['before.ini', 'after.ini', expected],
])('Comparsion of files %p %p', (configA, configB, expectedOutput) => {
  const pathA = getFixturePath(configA);
  const pathB = getFixturePath(configB);
  expect(genDiff(pathA, pathB, 'json')).toBe(expectedOutput);
});
