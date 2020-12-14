import _ from 'lodash';

const indentUnit = '    ';
const generateIndent = (depth) => `\n${indentUnit.repeat(depth)}`;

const stringify = (data, depth, render) => {
  if (_.isPlainObject(data)) {
    const normalizedObj = Object.entries(data)
      .map(([key, value]) => ({ type: 'unchanged', key, value }));
    return render(normalizedObj, depth + 1);
  }
  return data;
};

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
        return `  - ${key}: ${stringify(valueOld, depth, render)}${indent}  + ${key}: ${strValue}`;
      case 'added':
        return `  + ${key}: ${strValue}`;
      case 'deleted':
        return `  - ${key}: ${strValue}`;
      case 'nested':
        return `    ${key}: ${render(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: '${type}'`);
    }
  });
  return `{${indent}${lines.join(indent)}${indent}}`;
};

export default (diff) => render(diff, 0);
