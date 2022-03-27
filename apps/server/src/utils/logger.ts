import winston, { createLogger, format } from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';
import { IS_PROD } from './constants';

const transports: (FileTransportInstance | ConsoleTransportInstance)[] = [
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log' }),
];

if (IS_PROD) {
  transports.push(
    new winston.transports.Console({
      format: format.simple(),
    }),
  );
}

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports,
});
