import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokenTable1776800000000 implements MigrationInterface {
  name = 'CreateRefreshTokenTable1776800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "refresh_tokens" (
      "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "userUuid" uuid NOT NULL,
      "tokenHash" text NOT NULL,
      "expiresAt" TIMESTAMP NOT NULL,
      "revoked" boolean NOT NULL DEFAULT false,
      "replacedBy" uuid,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "replacedAt" TIMESTAMP,
      "lastUsedAt" TIMESTAMP,
      "ip" character varying(45),
      "userAgent" text,
      CONSTRAINT "PK_refresh_tokens_uuid" PRIMARY KEY ("uuid")
    )`);

    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_refresh_tokens_user" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_refresh_tokens_userUuid" ON "refresh_tokens" ("userUuid")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_refresh_tokens_expiresAt" ON "refresh_tokens" ("expiresAt")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_refresh_tokens_expiresAt"`);
    await queryRunner.query(`DROP INDEX "IDX_refresh_tokens_userUuid"`);
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_refresh_tokens_user"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
