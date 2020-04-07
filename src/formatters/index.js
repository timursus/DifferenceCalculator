import toJson from './json.js';
import toPlain from './plain.js';

export default (diff, format) => {
  if (format === 'json') {
    return toJson(diff);
  }
  if (format === 'plain') {
    return toPlain(diff);
  }
  return null; // error: unsupported output format!
};
