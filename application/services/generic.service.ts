import { Repository, InsertResult, FindOneOptions } from 'typeorm';
import { createConnection, Connection } from "typeorm";
import { DB_CONFIG } from '../config/db.config';

export interface IService<ENTITY> {
    initializeRepository(): void;
    
    findAll(): Promise<ENTITY[]>;

    findById(id: any): Promise<ENTITY>;
    
    findByIds(ids: any[]): Promise<ENTITY[]>;
    
    destroy(object: ENTITY): Promise<ENTITY>;
    
    destroyMultiple(object: ENTITY[]): Promise<ENTITY[]>;
    
    insert(object: ENTITY): Promise<InsertResult>;
    
    update(object: ENTITY): Promise<ENTITY>;
    
    count(): Promise<number>;
}

export abstract class GenericService<ENTITY> implements IService<ENTITY> {
    protected repository: Repository<ENTITY>;
    protected connection: Connection;
    public abstract initializeRepository(): void;

    constructor() {
        this.initializeRepository();
    }
    
    async findAll(): Promise<ENTITY[]> {
        return await this.repository.find();
    }
    
    async findById(id: any): Promise<ENTITY> {
        const findOptions = { id: id };
        return await this.repository.findOne({
            where: findOptions
        });
    }
    
    async findByIds(ids: any[]): Promise<ENTITY[]> {
        return await this.repository.findByIds(ids);
    }
    
    async destroy(object: ENTITY): Promise<ENTITY> {
        return await this.repository.remove(object);
    }
    
    async destroyMultiple(object: ENTITY[]): Promise<ENTITY[]> {
        return await this.repository.remove(object);
    }
    
    async insert(object: ENTITY): Promise<InsertResult> {
        return await this.repository.insert(object);
    }
    
    async update(object: ENTITY): Promise<ENTITY> {
        return await this.repository.save(<any>object);
    }
    
    async count(): Promise<number> {
        return await this.repository.count();
    }
}