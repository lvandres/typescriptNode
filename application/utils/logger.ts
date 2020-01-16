import * as winston from 'winston';
import * as Koa from 'koa';

export const register = winston.createLogger({
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	level: 'info',
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/all.log' }),
	],
});

export function registerRequest(register: winston.Logger) {
	return async(ctx: Koa.Context, next: () => Promise<any>) => {
		let logLevel = 'info';
		const start = new Date().getTime();
		await next();

		const ms = new Date().getTime() - start;
		if (ctx.status >= 500) {
			logLevel = 'error';
		} else if (ctx.status >= 400) {
			logLevel = 'warn';
		}

		const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

		register.log(logLevel, msg);
	};
}