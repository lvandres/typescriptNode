import { IRouterContext } from 'koa-router';
import { Inject } from 'typescript-ioc';
import DirectorController from '../controllers/DirectorController';
import * as Router from 'koa-router';

export default class DirectorRoutes {

	constructor(@Inject private directorController: DirectorController) {
	}

	public addRoutes(router: Router) {
		router.get('/directors', (ctx: IRouterContext) => this.directorController.getAllDirectors(ctx));
		router.get('/directors/:id', (ctx: IRouterContext) => this.directorController.findDirectorById(ctx));
		router.post('/directors', (ctx: IRouterContext) => this.directorController.saveDirector(ctx));
		router.put('/directors/:id', (ctx: IRouterContext) => this.directorController.saveDirector(ctx));
		router.delete('/directors/:id', (ctx: IRouterContext) => this.directorController.deleteDirector(ctx));
	}
}