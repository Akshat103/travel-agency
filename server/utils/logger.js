const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, printf, colorize } = format;

// Define the custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Set up daily rotation for logs
const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
});

// Create the logger
const logger = createLogger({
    level: 'info', // Set default log level
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        dailyRotateFileTransport,
        new transports.Console({
            format: combine(
                colorize(),
                logFormat
            )
        }),
    ],
});

// Add transports for specific log levels
logger.add(new transports.Console({
    level: 'warn',
    format: combine(
        colorize(),
        logFormat
    ),
}));

logger.add(new transports.Console({
    level: 'error',
    format: combine(
        colorize(),
        logFormat
    ),
}));

module.exports = logger;
