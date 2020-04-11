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
  const plainStrings = diff
    .filter(({ type }) => type !== 'unchanged')
    .map(({
      key, valueOld, valueNew, type, children,
    }) => {
      const beginning = `Property '${path}${key}' was ${type}`;
      switch (type) {
        case 'changed':
          return `${beginning} from ${transform(valueOld)} to ${transform(valueNew)}`;
        case 'added':
          return `${beginning} with value: ${transform(valueNew)}`;
        case 'deleted':
          return `${beginning}`;
        case 'nested':
          return render(children, `${path}${key}.`);
        default:
          throw new Error(`Unknown node type: '${type}'`);
      }
    });
  return plainStrings.join('\n');
};

export default render;
