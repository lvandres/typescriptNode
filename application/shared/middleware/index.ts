import { Inject, Scope, Provider, Scoped } from 'typescript-ioc';
import { IRouterContext } from 'koa-router';
import { sign, verify } from 'jsonwebtoken';
import { AppConfig } from '../../config/app.config';
import UserService from '../../services/UserService';

export default class Middlewares {
	constructor(
		@Inject private userService: UserService
	) { }

	async validToken(ctx: IRouterContext, next: () => Promise<any>) {
		let jwtPayload;
		const token = <string>ctx.header.token;

		try {
			jwtPayload = <any>verify(token, AppConfig.JWTSECRET);
			ctx.state.jwtPayload = jwtPayload;
		} catch (error) {
			ctx.throw(401);
		}

		const { username, lastname } = jwtPayload;
		const newToken = sign({ username, lastname }, AppConfig.JWTSECRET, {
			expiresIn: '1d'
		});

		ctx.set('token', newToken);
		await next();
	}
}