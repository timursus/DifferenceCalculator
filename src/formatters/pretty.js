import { isPlainObject } from 'lodash';

const indentUnit = '    ';
const generateIndent = (depth) => indentUnit.repeat(depth);

const stringify = (data, depth) => {
  if (!isPlainObject(data)) {
    return data?.toString();
  }
  const indent = generateIndent(depth);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indent}    ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent}}`;
};

const render = (diff, depth = 0) => {
  const indent = generateIndent(depth);
  const prettyLines = diff.map(({
    key, type, value, valueOld, children,
  }) => {
    const strValue = stringify(value, depth + 1);

    switch (type) {
      case 'unchanged':
        return `${indent}    ${key}: ${strValue}`;
      case 'changed': {
        const strValueOld = stringify(valueOld, depth + 1);
        return `${indent}  - ${key}: ${strValueOld}\n${indent}  + ${key}: ${strValue}`;
      }
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
  return `{\n${prettyLines.join('\n')}\n${indent}}`;
};

export default render;
