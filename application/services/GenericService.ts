import { GenericRepository } from '../repositories/GenericRepository';
import { EntitiesResponse } from '../shared/responses/IEntitiesResponse';
import { InsertResult } from 'typeorm';
import EntityNotFoundError from '../exceptions/EntityNotFoundError';
import BadRequestEntity from '../exceptions/BadRequestEntity';
import InternalServerError from '../exceptions/InternalServerError';

export interface IService<ENTITY> {
    findAll(page: number): Promise<EntitiesResponse<ENTITY>>;
    findById(id: string): Promise<ENTITY>;
    delete(objectID: string): Promise<ENTITY>;
    save(object: ENTITY): Promise<InsertResult>;
    update(object: ENTITY): Promise<ENTITY>;
}

export abstract class GenericService<ENTITY> implements IService<ENTITY> {
    protected abstract repository: GenericRepository<ENTITY>;
    
    public async findById(id: string): Promise<ENTITY> {
        return this.repository.findById(id);
    }

    public async findAll(page: number): Promise<EntitiesResponse<ENTITY>> {
        return this.repository.findAll(page);
    }

    public async save(object: ENTITY): Promise<InsertResult> {
        try {
            return this.repository.insert(object);
        } catch(e) {
            console.log(e);
            if(e.code == '23505') {
                console.log('esta duplicado');
            }
            throw new InternalServerError('Internal Server Error');
        }
    }

    public async update(object: ENTITY): Promise<ENTITY> {
        try {
            await this.repository.findOne(object);
            return this.repository.update(object);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity(`The deleted ${this.repository.nameClass} does not exist yet.`);
            }
            throw new InternalServerError('Internal Server Error');
        }
    }

    public async delete(objectID: string): Promise<ENTITY> {
        try {
            const object = await this.repository.findById(objectID);
            return this.repository.destroy(object);
        } catch(e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity(`The deleted ${this.repository.nameClass} does not exist yet.`);
            }
            throw new InternalServerError('Internal Server Error');
        }
    }
}