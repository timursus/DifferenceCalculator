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
    key, type, value, valueOld, children,
  }) => {
    const strValue = stringify(value, depth + 1);

    switch (type) {
      case 'unchanged':
        return `${indent}    ${key}: ${strValue}`;
      case 'changed':
        return `${indent}  - ${key}: ${stringify(valueOld, depth + 1)}\n${indent}  + ${key}: ${strValue}`;
      case 'added':
        return `${indent}  + ${key}: ${strValue}`;
      case 'deleted':
        return `${indent}  - ${key}: ${strValue}`;
      case 'nested':
        return `${indent}    ${key}: ${render(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: '${type}'`);
    }
  });
  return `{\n${prettyStrings.join('\n')}\n${indent}}`;
};

export default render;
