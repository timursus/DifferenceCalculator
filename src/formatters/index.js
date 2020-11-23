import formatToPretty from './pretty.js';
import formatToPlain from './plain.js';

const mapping = {
  pretty: formatToPretty,
  plain: formatToPlain,
  json: JSON.stringify,
};

export default (diff, format) => {
  try {
    return mapping[format](diff);
  } catch (e) {
    throw new Error(`Unsupported output format: '${format}'`);
  }
};
