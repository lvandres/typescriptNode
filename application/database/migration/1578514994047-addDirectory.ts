import {MigrationInterface, QueryRunner} from "typeorm";

export class addDirectory1578514994047 implements MigrationInterface {
    name = 'addDirectory1578514994047'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "director" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthYear" integer NOT NULL, CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "director"`, undefined);
    }

}
