import { isPlainObject } from 'lodash';

const generateIndent = (depth) => '    '.repeat(depth);

const stringify = (data, depth) => {
  if (!isPlainObject(data)) {
    return data;
  }
  const indent = generateIndent(depth);
  const str = Object.entries(data)
    .map(([key, value]) => `${indent}    ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${str.join('\n')}\n${indent}}`;
};

const render = (diff, depth = 0) => {
  const indent = generateIndent(depth);
  const prettyStrings = diff.map(({
    key, valueOld, valueNew, type, children,
  }) => {
    const strValueOld = stringify(valueOld, depth + 1);
    const strValueNew = stringify(valueNew, depth + 1);

    switch (type) {
      case 'unchanged':
        return `${indent}    ${key}: ${strValueOld}`;
      case 'changed':
        return `${indent}  - ${key}: ${strValueOld}\n${indent}  + ${key}: ${strValueNew}`;
      case 'added':
        return `${indent}  + ${key}: ${strValueNew}`;
      case 'deleted':
        return `${indent}  - ${key}: ${strValueOld}`;
      case 'nested':
        return `${indent}    ${key}: ${render(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: '${type}'`);
    }
  });
  return `{\n${prettyStrings.join('\n')}\n${indent}}`;
};

export default render;
