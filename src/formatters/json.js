import { isPlainObject } from 'lodash';

const stringify = (data, depth) => {
  const indent = '    '.repeat(depth);
  const ent = Object.entries(data);
  const str = ent.map(([key, value]) => `${indent}    ${key}: ${isPlainObject(value) ? stringify(value, depth + 1) : value}`);
  return `{\n${str.join('\n')}\n${indent}}`;
};

const renderer = (diff, depth = 0) => {
  const indent = '    '.repeat(depth);
  const strings = diff.map((keyDiff) => {
    const {
      key, valueOld, valueNew, status, children,
    } = keyDiff;

    if (children) {
      return `${indent}    ${key}: ${renderer(children, depth + 1)}`;
    }

    const strValueOld = isPlainObject(valueOld) ? stringify(valueOld, depth + 1) : valueOld;
    const strValueNew = isPlainObject(valueNew) ? stringify(valueNew, depth + 1) : valueNew;

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
