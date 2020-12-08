const transform = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const render = (diff, path = '') => {
  const plainLines = diff
    .filter(({ type }) => type !== 'unchanged')
    .map(({
      key, type, value, valueOld, children,
    }) => {
      const beginning = `Property '${path}${key}' was ${type}`;
      switch (type) {
        case 'changed':
          return `${beginning} from ${transform(valueOld)} to ${transform(value)}`;
        case 'added':
          return `${beginning} with value: ${transform(value)}`;
        case 'deleted':
          return `${beginning}`;
        case 'nested':
          return render(children, `${path}${key}.`);
        default:
          throw new Error(`Unknown node type: '${type}'`);
      }
    });
  return plainLines.join('\n');
};

export default render;
