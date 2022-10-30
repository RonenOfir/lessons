import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const defaultWinstonFormat = winston.format.combine(
    winston.format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
)

export const loggingConfig: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            format: defaultWinstonFormat
        }),
        new winston.transports.File({
            format: defaultWinstonFormat,
            filename: 'logs/logs.log',
        })
    ],
}