import { Singleton } from 'typescript-ioc';
import { getManager } from 'typeorm';
import User from '../database/entity/User';
import { GenericRepository, IRepository } from './GenericRepository';

@Singleton
export default class UserRepository extends GenericRepository<User> implements IRepository<User> {
	nameClass = 'User';
	constructor() {
		super();
	}

	async initializeRepository() {
		this.repository = getManager().getRepository(User);
	}
}