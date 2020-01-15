import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserTable1567488930478 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`DROP TABLE "user"`);
	}

}
