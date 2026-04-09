import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1775734008201 implements MigrationInterface {
    name = 'Migrate1775734008201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('seller', 'admin', 'agency')`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "birthDate" date NOT NULL, "phone" character varying(14) NOT NULL, "password_hash" text NOT NULL, "avatar_url" text, "role" "public"."users_role_enum" NOT NULL DEFAULT 'seller', "isActived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
