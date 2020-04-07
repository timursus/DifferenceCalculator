const transformer = (value) => {
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
  const strings = diff
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
          return `${beginning} changed from ${transformer(valueOld)} to ${transformer(valueNew)}`;
        case 'added':
          return `${beginning} added with value: ${transformer(valueNew)}`;
        case 'deleted':
          return `${beginning} deleted`;
        default:
          return null;
      }
    });
  return strings.join('\n');
};

export default renderer;
