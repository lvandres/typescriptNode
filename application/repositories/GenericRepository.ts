import { Repository, InsertResult, FindOneOptions } from 'typeorm';
import { getManager } from "typeorm";
import Director from "../database/entity/Director";

export interface IRepository<ENTITY> {
  
  findAll(): Promise<ENTITY[]>;

  findById(id: any): Promise<ENTITY>;
  
  findByIds(ids: any[]): Promise<ENTITY[]>;
  
  destroy(object: ENTITY): Promise<ENTITY>;
  
  destroyMultiple(object: ENTITY[]): Promise<ENTITY[]>;
  
  insert(object: ENTITY): Promise<InsertResult>;
  
  update(object: ENTITY): Promise<ENTITY>;
  
  count(): Promise<number>;
}


export abstract class GenericRepository<ENTITY> implements IRepository<ENTITY> {
  protected repository: Repository<ENTITY>;
  public abstract initializeRepository(): void;

  constructor() {
    this.initializeRepository();
  }
  
  async findAll(): Promise<ENTITY[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<ENTITY> {
    const result = await this.repository.findOne(id);
    if(!result) {
      throw('Not found');
    }
    return result;
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