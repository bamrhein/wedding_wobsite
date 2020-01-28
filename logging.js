const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


// Create a custom logging format
const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});


const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(
    label({ label: 'error' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  // For adding properties other than 'level' and 'message'
  // defaultMeta: { 'service': 'name-of-service' },
  transports: [
    new DailyRotateFile({
      filename: path.join(__dirname, 'log/error.log.%DATE%'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '7d',
      // utc: true
    })
  ]
});

const rsvpLogger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'rsvp' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(__dirname, 'log/rsvp.log.%DATE%'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      // maxFiles: '7d',
      // utc: true
    })
  ]
});


// If we're not in production, then ALSO log to the `console` with
// the colorized simple format.
// if (process.env.NODE_ENV !== 'production') {
//   errorLogger.add(new transports.Console({
//     format: format.combine(
//       format.colorize(),
//       format.simple()
//     )
//   }));
// }

module.exports = {
  error: errorLogger,
  rsvp: rsvpLogger
};