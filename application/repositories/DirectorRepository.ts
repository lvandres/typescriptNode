import { Singleton } from "typescript-ioc";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import Director from "../database/entity/Director";
import IRepository from "../repositories/IRepository";

@Singleton
export default class DirectorRepository extends IRepository {

  constructor() {
    super();
  }

  public async getAllDirectors(): Promise<Director[]> {
    return this.getDirectorRepository().find();
  }

  public async findDirectorById(id: number): Promise<Director> {
    const result = await this.getDirectorRepository().findOne(id);
    if (!result) {
        throw new EntityNotFoundError("No director was found for ID: " + id);
    }
    return result;
  }

  public async saveDirector(director: Director): Promise<Director> {
    return this.getDirectorRepository().save(director);
  }

  public async deleteDirectorWithId(id: number) {
    await this.getDirectorRepository()
        .createQueryBuilder("director")
        .delete()
        .where("director.id = :id", { id })
        .execute();
    return Promise.resolve();
  }
}