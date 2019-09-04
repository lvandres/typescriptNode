import { GenericService, IService } from "./generic.service";
import { User } from "../database/entity/user";
import { createConnection } from "typeorm";
import { DB_CONFIG } from '../config/db.config';

export class UserService extends GenericService<User> implements IService<User> {
    constructor() {
        super()
    }

    async initializeRepository() {
        this.connection = await createConnection(DB_CONFIG);
        this.repository = this.connection.getRepository(User);
    }
}