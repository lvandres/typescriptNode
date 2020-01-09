import { Singleton } from "typescript-ioc";
import { getManager, InsertResult } from "typeorm";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import Director from "../database/entity/Director";
import GenericRepository from "../repositories/IRepository";

@Singleton
export default class DirectorRepository extends GenericRepository<Director> {

  constructor() {
    super();
    // getManager().getRepository(Director)
  }

  async initializeRepository() {
    this.repository = getManager().getRepository(Director);
}

  public async getAllDirectors(): Promise<Director[]> {
    return this.findAll();
  }

  public async findDirectorById(id: number): Promise<Director> {
    const result = await this.findById(id);
    if (!result) {
        throw new EntityNotFoundError("No director was found for ID: " + id);
    }
    return result;
  }

  public async saveDirector(director: Director): Promise<InsertResult> {
    return this.insert(director);
  }

  public async deleteDirectorWithId(id: number) {
    await this.repository
        .createQueryBuilder("director")
        .delete()
        .where("director.id = :id", { id })
        .execute();
    return Promise.resolve();
  }
}