import * as winston from "winston";

let logger = winston.createLogger({
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	level: 'info',
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/all.log' }),
	],
});

export default logger;