import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../shared/enums/role";

@Entity()
export default class User {

	@PrimaryGeneratedColumn("uuid")
	private id: string;

	@Column({ unique: true })
	@IsEmail()
	private email: string;

	@Column()
	@Length(4, 100)
	private password: string;

	@Column()
	@IsNotEmpty()
	private role: Role;

	@Column()
	@Length(4, 20)
	private name: string;

	@Column()
	@Length(4, 20)
	private lastName: string;

	@CreateDateColumn()
	private createdAt: Date;

	@UpdateDateColumn()
	private updatedAt: Date;

	@Column()
	private isActive: boolean;

	public get Id(): string {
		return this.id;
	}

	public set Id(value: string) {
		this.id = value;
	}

	public get Email(): string {
		return this.email;
	}

	public set Email(value: string) {
		this.email = value;
	}

	public get Password(): string {
		return this.password;
	}

	public set Password(value: string) {
		this.password = value;
	}

	public get Role(): Role {
		return this.role;
	}

	public set Role(value: Role) {
		this.role = value;
	}

	public get Name(): string {
		return this.name;
	}

	public set Name(value: string) {
		this.name = value;
	}

	public get LastName(): string {
		return this.lastName;
	}

	public set LastName(value: string) {
		this.lastName = value;
	}

	public get CreatedAt(): Date {
		return this.createdAt;
	}

	public set CreatedAt(value: Date) {
		this.createdAt = value;
	}

	public get UpdatedAt(): Date {
		return this.updatedAt;
	}

	public set IsActive(value: boolean) {
		this.isActive = value;
	}

	public get IsActive(): boolean {
		return this.isActive;
	}

	public static newUser(obj: {
		id?: string, email?: string, password?: string,
		role?: number, name?: string, lastName?: string,
		isActive?: boolean
	}) {
		const newUser = new User();
		if (obj.id) newUser.Id = obj.id;
		if (obj.email) newUser.Email = obj.email;
		if (obj.password) newUser.Password = obj.password;
		if (obj.name) newUser.Name = obj.name;
		if (obj.lastName) newUser.LastName = obj.lastName;
		if (obj.role) newUser.Role = obj.role;
		newUser.IsActive = obj.isActive || false;
		return newUser;
	}
}