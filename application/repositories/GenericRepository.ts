import { Repository, InsertResult, FindOneOptions } from 'typeorm';

export interface IRepository<ENTITY> {
  
  findAll(page: number, take: number): Promise<ENTITY[]>;

  findById(id: string): Promise<ENTITY>;
  
  findByIds(ids: string[]): Promise<ENTITY[]>;
  
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
  
  async findAll(page: number = 0, take: number = 10): Promise<ENTITY[]> {
    return await this.repository
      .createQueryBuilder(this.repository.metadata.name)
      .skip(page * take)
      .take(take)
      .getMany();
  }

  async findById(id: string): Promise<ENTITY> {
    const result = await this.repository.findOne(id);
    if(!result) {
      throw('Not found');
    }
    return result;
  }

  async findByIds(ids: string[]): Promise<ENTITY[]> {
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