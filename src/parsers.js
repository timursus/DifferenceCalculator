import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.safeLoad(data);
  }
  if (extension === '.ini') {
    return ini.parse(data);
  }
  return null; // error: unsupported file extension!
};
