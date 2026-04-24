import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenColumnUserTable1776738983679 implements MigrationInterface {
    name = 'AddRefreshTokenColumnUserTable1776738983679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_4fdf5f552fcfe06082a35e97288" UNIQUE ("refreshToken")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_4fdf5f552fcfe06082a35e97288"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
