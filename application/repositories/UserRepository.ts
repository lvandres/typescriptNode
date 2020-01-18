import { Singleton } from 'typescript-ioc';
import { getManager } from 'typeorm';
import User from '../database/entity/User';
import { GenericRepository, IRepository } from './GenericRepository';
import EntityNotFoundError from '../exceptions/EntityNotFoundError';

@Singleton
export default class UserRepository extends GenericRepository<User> implements IRepository<User> {
	nameClass = 'User';

	constructor() {
		super();
	}

	async initializeRepository() {
		this.repository = getManager().getRepository(User);
	}

	async findByEmail(email: string): Promise<User> {
		const result = await this.repository.findOne({ where: { email: email } });
		if (!result) {
			throw new EntityNotFoundError(`"No ${this.repository.metadata.name} was found for Email: ${email}`);
		}
		return result;
	}
}