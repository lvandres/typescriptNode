import { Singleton } from 'typescript-ioc';
import { getManager } from 'typeorm';
import Director from '../database/entity/Director';
import { GenericRepository, IRepository } from './GenericRepository';

@Singleton
export default class DirectorRepository extends GenericRepository<Director> implements IRepository<Director> {
	nameClass = 'Director';
	constructor() {
		super();
	}

	async initializeRepository() {
		this.repository = getManager().getRepository(Director);
	}
}