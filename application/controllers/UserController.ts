import { Inject, Singleton } from 'typescript-ioc';
import UserService from '../services/UserService';
import { GenericController, IController } from './GenericController';
import User from '../database/entity/User';
import { IRouterContext } from 'koa-router';

@Singleton
export default class UserController extends GenericController<User> implements IController {
	service: UserService;

	constructor(@Inject private userService: UserService) {
		super();
		this.service = userService;
	}

	public async getAll(ctx: IRouterContext) {
		const page = ctx.query.page || 1;
		ctx.body = await this.userService.findAll(page);
	}

	public async create(ctx: IRouterContext) {
		try {
			const user: User = User.newUser(ctx.request.body);
			const result = await this.service.save(user);
			ctx.body = result;
		} catch (e) {
			ctx.throw(400, e.message);
		}
	}

	public async login(ctx: IRouterContext) {
		const { email, password } = ctx.request.body;
		if (!(email && password)) ctx.throw(400);
		try {
			const newToken = await this.userService.login(email, password);
			ctx.set('x-token', newToken);
			ctx.status = 200;
		} catch (e) {
			ctx.throw(401, 'Usuario o password incorrectos.');
		}
	}
}