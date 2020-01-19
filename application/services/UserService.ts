import { Inject, Singleton } from 'typescript-ioc';
import User from '../database/entity/User';
import UserRepository from '../repositories/UserRepository';
import { GenericService, IService } from './GenericService';
import { sign } from 'jsonwebtoken';
import { AppConfig } from '../config/app.config';

@Singleton
export default class UserService extends GenericService<User> implements IService<User> {
	repository: UserRepository;

	constructor(@Inject private userRepository: UserRepository) {
		super();
		this.repository = userRepository;
	}

	async login(email: string, password: string): Promise<string> {
		let user, result;
		try {
			user = await this.userRepository.findByEmail(email);
			result = user.validatePassword(password);
		} catch (e) {
			throw(new Error('Usuario incorrecto'));
		}
		if (!result) throw(new Error('Password incorrecto'));
		const jwtPayload = { id : user.Id, name: user.Name, lastName: user.LastName, role: user.Role };
		const newToken = sign( jwtPayload, AppConfig.JWTSECRET, { expiresIn: '1d' } );
		return Promise.resolve(newToken);
	}
}