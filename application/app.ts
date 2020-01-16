import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import { Container } from 'typescript-ioc';

import { createConnection } from 'typeorm';
import { DB_CONFIG } from './config/db.config';
import { registerRequest, register } from './utils/logger';
import Router from './routes/IndexRoutes';

export class App {
	constructor() { }

	private async createApp() {
		await createConnection(DB_CONFIG);

		const app: Koa = new Koa();
		const router: Router = Container.get(Router);

		app.use(logger());
		app.use(bodyParser());
		app.use(registerRequest(register));
		app.use(router.routes());
		app.use(router.allowedMethods());

		return Promise.resolve(app);
	}

	public async start() {
		const app = await this.createApp();
		console.log('Started listening on port 3000...');
		const server = app.listen(3000);
		return Promise.resolve(server);
	}
}