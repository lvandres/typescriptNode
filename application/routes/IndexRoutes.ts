import * as Router from "koa-router";
import { Inject } from "typescript-ioc";

import DirectorRoutes from "./DirectorRoutes";
import UserRoutes from "./UsersRoutes";


export default class IndexRouter extends Router {
    constructor(
        @Inject private directorRoutes: DirectorRoutes,
        @Inject private userRoutes: UserRoutes
    ) {
        super({ prefix: '/api/v1' });
        this.addRoutes();
    }

    addRoutes() {
        this.directorRoutes.register(this);
        this.userRoutes.register(this);
    }
};