import * as Router from "koa-router";
import { Inject } from "typescript-ioc";

import DirectorRoutes from "./DirectorRoutes";


export default class CustomRouter extends Router {
    constructor(
        @Inject private directorRoutes: DirectorRoutes
    ) {
        super({ prefix: '/api/v1' });
        this.addRoutes();
    }

    addRoutes() {
        this.directorRoutes.register(this);
    }
};