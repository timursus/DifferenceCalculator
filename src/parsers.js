import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data, type) => {
  try {
    return mapping[type](data);
  } catch (e) {
    throw new Error(`Unsupported data type: '${type}'`);
  }
};
