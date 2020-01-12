import { IRouterContext } from "koa-router";
import { Inject } from "typescript-ioc";
import Route from "../shared/models/Route";
import IRoutes from "./IRoutes";
import UserController from "../controllers/UserController";

export default class UserRoutes extends IRoutes {

    constructor( @Inject private userController: UserController) {
        super();
    }

    protected getRoutes(): Route[] {
        return [
            Route.newRoute("/users", "get", (ctx: IRouterContext) => this.userController.getAll(ctx)),
            Route.newRoute("/users/:id", "get", (ctx: IRouterContext) => this.userController.findById(ctx)),
            Route.newRoute("/users", "post", (ctx: IRouterContext) => this.userController.save(ctx))
        ];
    }

}