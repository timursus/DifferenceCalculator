import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extension) => {
  let parse;
  if (extension === '.json') {
    parse = JSON.parse;
  } else if (extension === '.yml') {
    parse = yaml.safeLoad;
  } else if (extension === '.ini') {
    parse = ini.parse;
  }

  return parse(data);
};
