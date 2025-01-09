/**
 * @class Logger
 * Handles Logging
 */
import moment from 'moment'
class Logger {
  log(...args) {
    // eslint-disable-next-line no-console
    console.log(moment().toString(), '***', ...args);
  }
}
export const validateMongoID = str => `${str}`.match(/^[0-9a-fA-F]{24}$/);

export default new Logger();
