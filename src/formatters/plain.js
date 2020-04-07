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

const renderer = (diff, path = '') => {
  const plainStrings = diff
    .filter(({ status }) => status !== 'unchanged')
    .map(({
      key, valueOld, valueNew, status, children,
    }) => {
      if (children) {
        return renderer(children, `${path}${key}.`);
      }

      const beginning = `Property '${path}${key}' was`;
      switch (status) {
        case 'changed':
          return `${beginning} changed from ${transform(valueOld)} to ${transform(valueNew)}`;
        case 'added':
          return `${beginning} added with value: ${transform(valueNew)}`;
        case 'deleted':
          return `${beginning} deleted`;
        default:
          throw new Error(`Unknown node status: '${status}'`);
      }
    });
  return plainStrings.join('\n');
};

export default renderer;
