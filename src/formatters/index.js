import toJson from './json';

export default (diff, format) => {
  if (format === 'json') {
    return toJson(diff);
  }
  return null; // error: unsupported output format!
};
