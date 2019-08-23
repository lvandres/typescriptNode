import express, { Application, RequestHandler, ErrorRequestHandler } from 'express';
import * as Sentry from '@sentry/node';
import morgan from 'morgan';
import logger from './utils/logger';
import { createConnection } from "typeorm";
import { DB_CONFIG } from './config/db.config';
import routes from './routes/index.routes';

export class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.settings();
    }

    private addRoutes(): void {
        this.app.use(routes);
    }

    private async settings(){
        const SENTRY_DSN = process.env.SENTRY_DSN;
        
        if(!process.env.PRODUCTION) this.app.use(morgan('dev'));
        try {
            Sentry.init({ dsn: SENTRY_DSN });
            this.app.use(Sentry.Handlers.requestHandler() as RequestHandler);
            await createConnection(DB_CONFIG);
            this.addRoutes();
            this.app.use(Sentry.Handlers.errorHandler() as ErrorRequestHandler);
        } catch(error) {
            logger.error(error);
        }
    }

    

    async listen(): Promise<void> {
        const PORT = process.env.PORT_APP || 3000;
        await this.app.listen(PORT);
        logger.info(`Server on port ${PORT}`);
    }
}