import { IRouterContext } from 'koa-router';
import { Inject } from 'typescript-ioc';
import UserController from '../controllers/UserController';
import * as Router from 'koa-router';
import Middlewares from '../shared/middleware';

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
			(ctx: IRouterContext, next: any) => this.middleares.validToken(ctx, next),
			(ctx: IRouterContext) => this.userController.findById(ctx));
		router.post('/users', (ctx: IRouterContext) => this.userController.save(ctx));
		router.put('/users/:id', (ctx: IRouterContext) => this.userController.update(ctx));
		router.delete('/users/:id', (ctx: IRouterContext) => this.userController.delete(ctx));
	}

}