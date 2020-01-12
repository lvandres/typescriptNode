import { IRouterContext } from "koa-router";
import { GenericService } from "../services/GenericService";

export interface IController {
    getAll(ctx: IRouterContext): Promise<void>;
    findById(ctx: IRouterContext): Promise<void>;
    delete(ctx: IRouterContext): Promise<void>;
    save(ctx: IRouterContext): Promise<void>;
    update(ctx: IRouterContext): Promise<void>;
}

export abstract class GenericController<ENTITY> implements IController{
    protected abstract service: GenericService<ENTITY>;

    public async getAll(ctx: IRouterContext) {
        const page = ctx.query.page || 1;
        ctx.body = await this.service.findAll(page);
    }

    public async findById(ctx: IRouterContext) {
        try {
            ctx.body = await this.service.findById(ctx.params.id);
        } catch (e) {
            ctx.throw(404);
        }
    }

    public async save(ctx: IRouterContext) {
        try {
            const object: ENTITY = ctx.request.body;
            const result = await this.service.save(object);
            ctx.body = result;
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async update(ctx: IRouterContext) {
        try {
            const object: ENTITY = JSON.parse(JSON.stringify(ctx.request.body));
            if (String(ctx.params.id) !== String(ctx.request.body.id)) {
                ctx.throw(400);
            }
            const result = await this.service.update(object);
            ctx.body = result;
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async delete(ctx: IRouterContext) {
        const objectID = ctx.params.id;
        await this.service.delete(objectID);
        ctx.status = 200;
    }
}