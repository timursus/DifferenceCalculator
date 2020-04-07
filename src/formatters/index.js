import formatToPretty from './pretty.js';
import formatToPlain from './plain.js';

export default (diff, format) => {
  if (format === 'pretty') {
    return formatToPretty(diff);
  }
  if (format === 'plain') {
    return formatToPlain(diff);
  }
  if (format === 'json') {
    return JSON.stringify(diff);
  }
  throw new Error(`Unsupported output format: '${format}'`);
};
