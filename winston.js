import winston from 'winston'

const { createLogger, format, transports } = winston

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'HH:mm:ss DD-MM-YYYY'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({ filename: './docs/error.log', level: 'error' }),
        new transports.File({ filename: './docs/combined.log' })
    ]
});

// logger.log({
//     level: 'info',
//     message: 'Pass an object and this works',
//     additional: 'properties',
//     are: 'passed along'
// });

// logger.info('Found %s at %s', 'error', new Date());

// logger.error(new Error('Error when loggin'));

export default logger