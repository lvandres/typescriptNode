import { Repository, InsertResult, SelectQueryBuilder } from 'typeorm';
import { Pagination, IPagination } from '../shared/models/pagination';
import { EntitiesResponse } from '../shared/responses/IEntitiesResponse';
import EntityNotFoundError from '../exceptions/EntityNotFoundError';

export interface IRepository<ENTITY> {
  findAll(page: number, take: number): Promise<EntitiesResponse<ENTITY>>;
  findById(id: string): Promise<ENTITY>;
  findByIds(ids: string[]): Promise<ENTITY[]>;
  destroy(object: ENTITY): Promise<ENTITY>;
  destroyMultiple(objects: ENTITY[]): Promise<ENTITY[]>;
  insert(object: ENTITY): Promise<InsertResult>;
  update(object: ENTITY): Promise<ENTITY>;
  count(): Promise<number>;
}

export abstract class GenericRepository<ENTITY> implements IRepository<ENTITY> {
  protected repository: Repository<ENTITY>;
  public abstract nameClass: string;
  public abstract initializeRepository(): void;

  constructor() {
    this.initializeRepository();
  }
  
  async findAll(page: number = 1, take: number = 10): Promise<EntitiesResponse<ENTITY>> {
    let customPage = page - 1;
    const query = await this.repository
      .createQueryBuilder(this.repository.metadata.name)
      .skip(customPage * take)
      .take(take);
    const pagination: IPagination = await this.getPagination(page, customPage, take);
    const records: ENTITY[] = await query.getMany();
    return {
      pagination,
      records
    }
  }

  async findById(id: string): Promise<ENTITY> {
    const result = await this.repository.findOne(id);
    if(!result) {
      throw new EntityNotFoundError(`"No ${this.repository.metadata.name} was found for ID: ${ id }`);
    }
    return result;
  }

  async findByIds(ids: string[]): Promise<ENTITY[]> {
    return await this.repository.findByIds(ids);
  }

  async findOne(object: ENTITY): Promise<ENTITY> {
    const result = await this.repository.findOne(object);
    if(!result) {
      throw new EntityNotFoundError(`"No ${this.repository.metadata.name}`)
    }
    return result;
  }

  async destroy(object: ENTITY): Promise<ENTITY> {
    return await this.repository.remove(object);
  }

  async destroyMultiple(objects: ENTITY[]): Promise<ENTITY[]> {
    return await this.repository.remove(objects);
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

  protected async getPagination(page: number, customPage: number, take: number): Promise<Pagination>{
    const pagination: IPagination = new Pagination();
    pagination.current_page = page;
    pagination.prev_page = customPage ? page - 1 : null;
    pagination.total_count = await this.count();
    pagination.total_pages = Math.ceil(pagination.total_count / take)|| 1;
    pagination.next_page = page >= pagination.total_pages ? null : page + 1;
    return pagination;
  }

}