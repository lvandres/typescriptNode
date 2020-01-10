import { Inject, Singleton } from "typescript-ioc";

import BadRequestEntity from "../exceptions/BadRequestEntity";
import EntityNotFoundError from "../exceptions/EntityNotFoundError";
import Director from "../database/entity/Director";
import DirectorRepository from "../repositories/DirectorRepository";
import { InsertResult } from "typeorm";

@Singleton
export default class DirectorService {

    constructor( @Inject private directorRepository: DirectorRepository) { }

    public async findById(id: number): Promise<Director> {
        return this.directorRepository.findById(id);
    }

    public async findAll(): Promise<Director[]> {
        return this.directorRepository.findAll();
    }

    public async save(director: Director): Promise<InsertResult> {
        return this.directorRepository.insert(director);
    }

    public async update(director: Director) {
        try {
            await this.directorRepository.findById(director.$id);
            return this.directorRepository.update(director);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity("The given director does not exist yet.");
            }
        }
    }

    public async delete(directorId: number) {
        try {
            const director = await this.directorRepository.findById(directorId);
            return this.directorRepository.destroy(director);
        } catch(e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestEntity("The deleted directory does not exist yet.");
            }
        }
    }
}