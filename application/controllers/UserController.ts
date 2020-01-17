import { Inject, Singleton } from 'typescript-ioc';
import UserService from '../services/UserService';
import { GenericController, IController } from './GenericController';
import User from '../database/entity/User';
import { IRouterContext } from 'koa-router';
import { sign, verify } from 'jsonwebtoken';
import { AppConfig } from '../config/app.config';

@Singleton
export default class UserController extends GenericController<User> implements IController {
	service: UserService;

	constructor(@Inject private userService: UserService) {
		super();
		this.service = userService;
	}

	public async getAll(ctx: IRouterContext) {
		const page = ctx.query.page || 1;
		const newToken = sign({ username: 'luis', lastname: 'vega', role: 2 }, AppConfig.JWTSECRET, {
			expiresIn: '1d'
		});
		ctx.set('token', newToken);
		ctx.body = await this.userService.findAll(page);
	}
}