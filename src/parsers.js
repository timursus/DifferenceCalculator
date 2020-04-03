import yaml from 'js-yaml';

export default (data, extension) => {
  let parse;
  if (extension === '.json') {
    parse = JSON.parse;
  } else if (extension === '.yml') {
    parse = yaml.safeLoad;
  }
  return parse(data);
};
