import User from '../../database/entity/User';
import { Role } from '../../shared/enums/role';

export default class UserTestBuilder {

	private user: User;

	constructor() {
		this.user = new User();
	}

	public static newUser(): UserTestBuilder {
		return new UserTestBuilder();
	}

	public withEmail(email: string): UserTestBuilder {
		this.user.Email = email;
		return this;
	}

	public withName(name: string): UserTestBuilder {
		this.user.Name = name;
		return this;
	}
	public withLastName(lastName: string): UserTestBuilder {
		this.user.LastName = lastName;
		return this;
	}
	public withPassword(password: string): UserTestBuilder {
		this.user.Password = password;
		return this;
	}

	public withRole(role: Role): UserTestBuilder {
		this.user.Role = role;
		return this;
	}

	public withId(id: string): UserTestBuilder {
		this.user.Id = id;
		return this;
	}

	public withRandomId(): UserTestBuilder {
		this.user.Id = UserTestBuilder.generateUUID();
		return this;
	}

	public withDefaultValues(): UserTestBuilder {
		return this
			.withEmail('John@gmail.com')
			.withName('John')
			.withLastName('Lasseter')
			.withPassword('password')
			.withRole(Role.Editor);
	}

	public build(): User {
		return this.user;
	}

	public static getListOfDefaultUsers(length: number): User[] {
		const result = [];
		for (let i = 0; i < length; i++) {
			result.push(UserTestBuilder.newUser().withDefaultValues().build());
		}
		return result;
	}

	public static generateUUID(): string { // Public Domain/MIT
		var d = new Date().getTime();//Timestamp
		var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16;//random number between 0 and 16
			if (d > 0) {//Use timestamp until depleted
				r = (d + r) % 16 | 0;
				d = Math.floor(d / 16);
			} else {//Use microseconds since page-load if supported
				r = (d2 + r) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}

}