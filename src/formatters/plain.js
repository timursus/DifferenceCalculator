const stringify = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const render = (diff, path) => {
  const lines = diff
    .filter(({ type }) => type !== 'unchanged')
    .map(({
      key, type, value, valueOld, children,
    }) => {
      const beginning = `Property '${path}${key}' was ${type}`;
      switch (type) {
        case 'changed':
          return `${beginning} from ${stringify(valueOld)} to ${stringify(value)}`;
        case 'added':
          return `${beginning} with value: ${stringify(value)}`;
        case 'deleted':
          return `${beginning}`;
        case 'nested':
          return render(children, `${path}${key}.`);
        default:
          throw new Error(`Unknown node type: '${type}'`);
      }
    });
  return lines.join('\n');
};

export default (diff) => render(diff, '');
