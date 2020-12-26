import chalk from 'chalk';
import identity from 'lodash/identity.js';
import formatToPretty from './pretty.js';
import formatToPlain from './plain.js';

export default (diff, format, color) => {
  const styles = {
    added: color ? chalk.green : identity,
    deleted: color ? chalk.red : identity,
    changed: color ? chalk.cyanBright : identity,
  };

  switch (format) {
    case 'pretty':
      return formatToPretty(diff, styles);
    case 'plain':
      return formatToPlain(diff, styles);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unsupported output format: '${format}'`);
  }
};
