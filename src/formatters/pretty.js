import isPlainObject from 'lodash/isPlainObject.js';

const indentUnit = '    ';
const generateIndent = (depth) => `\n${indentUnit.repeat(depth)}`;

const stringify = (data, depth, render) => {
  if (isPlainObject(data)) {
    const normalizedObj = Object.entries(data)
      .map(([key, value]) => ({ type: 'unchanged', key, value }));
    return render(normalizedObj, depth + 1);
  }
  return data;
};

export default (root, styles) => {
  const render = (diff, depth) => {
    const indent = generateIndent(depth);
    const lines = diff.map(({
      type, key, value, valueOld, children,
    }) => {
      const strValue = stringify(value, depth, render);
      switch (type) {
        case 'unchanged':
          return `    ${key}: ${strValue}`;
        case 'changed':
          return styles[type](`  - ${key}: ${stringify(valueOld, depth, render)}${indent}  + ${key}: ${strValue}`);
        case 'added':
          return styles[type](`  + ${key}: ${strValue}`);
        case 'deleted':
          return styles[type](`  - ${key}: ${strValue}`);
        case 'nested':
          return `    ${key}: ${render(children, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: '${type}'`);
      }
    });
    return `{${indent}${lines.join(indent)}${indent}}`;
  };

  return render(root, 0);
};
