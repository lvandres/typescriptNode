import { Inject, Singleton } from 'typescript-ioc';
import User from '../database/entity/User';
import UserRepository from '../repositories/UserRepository';
import { GenericService, IService } from './GenericService';

@Singleton
export default class UserService extends GenericService<User> implements IService<User> {
	repository: UserRepository;

	constructor(@Inject private directorRepository: UserRepository) {
		super();
		this.repository = directorRepository;
	}
}