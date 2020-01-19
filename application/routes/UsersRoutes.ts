import { IRouterContext } from 'koa-router';
import { Inject } from 'typescript-ioc';
import UserController from '../controllers/UserController';
import * as Router from 'koa-router';
import Middlewares from '../shared/middleware';
import { Role } from '../shared/enums/role';

export default class UserRoutes {

	constructor(
		@Inject private userController: UserController,
		@Inject private middleares: Middlewares
	) {
	}

	public addRoutes(router: Router) {
		router.get('/users', (ctx: IRouterContext) => this.userController.getAll(ctx));
		router.get(
			'/users/:id',
			this.middleares.validToken,
			this.middleares.validRole([Role.Guest]).bind(this.middleares),
			(ctx: IRouterContext) => this.userController.findById(ctx));
		router.post(
			'/users',
			this.middleares.validToken,
			this.middleares.validRole([Role.Admin, Role.Editor, Role.Guest]).bind(this.middleares),
			(ctx: IRouterContext) => this.userController.create(ctx)
		);
		router.put('/users/:id', (ctx: IRouterContext) => this.userController.update(ctx));
		router.delete('/users/:id', (ctx: IRouterContext) => this.userController.delete(ctx));
		router.post(
			'/users/login',
			(ctx: IRouterContext) => this.userController.login(ctx)
		);
	}

}