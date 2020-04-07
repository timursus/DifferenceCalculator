import { isPlainObject } from 'lodash';

const stringify = (data, depth) => {
  if (!isPlainObject(data)) return data;
  const indent = '    '.repeat(depth);
  const entries = Object.entries(data);
  const str = entries.map(([key, value]) => `${indent}    ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${str.join('\n')}\n${indent}}`;
};

const renderer = (diff, depth = 0) => {
  const indent = '    '.repeat(depth);
  const strings = diff.map(({
    key, valueOld, valueNew, status, children,
  }) => {
    if (children) {
      return `${indent}    ${key}: ${renderer(children, depth + 1)}`;
    }

    const strValueOld = stringify(valueOld, depth + 1);
    const strValueNew = stringify(valueNew, depth + 1);

    switch (status) {
      case 'unchanged':
        return `${indent}    ${key}: ${strValueOld}`;
      case 'changed':
        return `${indent}  - ${key}: ${strValueOld}\n${indent}  + ${key}: ${strValueNew}`;
      case 'added':
        return `${indent}  + ${key}: ${strValueNew}`;
      case 'deleted':
        return `${indent}  - ${key}: ${strValueOld}`;
      default:
        return null;
    }
  });
  return `{\n${strings.join('\n')}\n${indent}}`;
};

export default renderer;
