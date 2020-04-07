import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const plainOutput = [
  "Property 'common.follow' was added with value: false",
  "Property 'common.setting2' was deleted",
  "Property 'common.setting3' was changed from true to [complex value]",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'common.setting6.ops' was added with value: 'vops'",
  "Property 'group1.baz' was changed from 'bas' to bars",
  "Property 'group1.nest' was changed from [complex value] to 'str'",
  "Property 'group2' was deleted",
  "Property 'group3' was added with value: [complex value]",
].join('\n');

const jsonOutput = [
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
  ['before.json', 'after.json', 'json', jsonOutput],
  ['before.json', 'after.json', 'plain', plainOutput],
  ['before.yml', 'after.yml', 'json', jsonOutput],
  ['before.yml', 'after.yml', 'plain', plainOutput],
  ['before.ini', 'after.ini', 'json', jsonOutput],
  ['before.ini', 'after.ini', 'plain', plainOutput],
])('Comparsion of files %p & %p, output format: %s', (configA, configB, format, expected) => {
  const pathA = getFixturePath(configA);
  const pathB = getFixturePath(configB);
  expect(genDiff(pathA, pathB, format)).toBe(expected);
});
