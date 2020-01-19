import { Inject, Scope, Provider, Scoped } from 'typescript-ioc';
import { IRouterContext } from 'koa-router';
import { sign, verify } from 'jsonwebtoken';
import { AppConfig } from '../../config/app.config';
import UserService from '../../services/UserService';
import { Role } from '../enums/role';

export default class Middlewares {
	constructor(
		@Inject private userService: UserService
	) { }

	async validToken(ctx: IRouterContext, next: () => Promise<any>) {
		let jwtPayload;
		const token = <string>ctx.header['x-token'];

		try {
			jwtPayload = <any>verify(token, AppConfig.JWTSECRET);
			ctx.state.jwtPayload = jwtPayload;
		} catch (error) {
			ctx.throw(401);
		}

		const { id, name, lastName, role } = jwtPayload;
		const newToken = sign({ id, name, lastName, role },
			AppConfig.JWTSECRET, { expiresIn: '1d' });
		ctx.set('x-token', newToken);
		await next();
	}

	validRole(roles: Array<Role>) {
		return async (ctx: IRouterContext, next: () => Promise<any>) => {
			const id = ctx.state.jwtPayload.id;
			try {
				const user = await this.userService.findById(id);
				if (roles.indexOf(user.Role) > -1) await next();
				else ctx.throw(401);
			} catch (e) {
				ctx.throw(401);
			}
		};
	}

}