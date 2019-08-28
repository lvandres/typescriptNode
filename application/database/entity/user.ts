import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../../shared/enums/role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique:true })
    @IsEmail()
    email: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    role: Role;

    @Column()
    @Length(4, 20)
    name: string;

    @Column()
    @Length(4, 20)
    last_name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    isActive: boolean;
}