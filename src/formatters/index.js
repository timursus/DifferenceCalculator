import formatToPretty from './pretty.js';
import formatToPlain from './plain.js';

export default (diff, format) => {
  switch (format) {
    case 'pretty':
      return formatToPretty(diff);
    case 'plain':
      return formatToPlain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unsupported output format: '${format}'`);
  }
};
