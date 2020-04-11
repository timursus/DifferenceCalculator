import yaml from 'js-yaml';
import ini from 'ini';

export default (data, type) => {
  if (type === 'json') {
    return JSON.parse(data);
  }
  if (type === 'yml' || type === 'yaml') {
    return yaml.safeLoad(data);
  }
  if (type === 'ini') {
    return ini.parse(data);
  }
  throw new Error(`Unsupported data type: '${type}'`);
};
