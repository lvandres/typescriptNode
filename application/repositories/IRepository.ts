import { getManager } from "typeorm";
import Director from "../database/entity/Director";


export default abstract class IRepository {

  protected getDirectorRepository() {
    return getManager().getRepository(Director);
  }

}