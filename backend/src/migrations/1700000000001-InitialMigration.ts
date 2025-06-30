import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700000000001 implements MigrationInterface {
  name = 'InitialMigration1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_tenant_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_role_name" UNIQUE ("name"), CONSTRAINT "PK_role_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text, "tenantId" integer NOT NULL, CONSTRAINT "UQ_user_email" UNIQUE ("email"), CONSTRAINT "PK_user_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" text NOT NULL, "completed" boolean NOT NULL DEFAULT false, "tenantId" integer NOT NULL, CONSTRAINT "PK_todo_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "method" text NOT NULL, "path" text NOT NULL, "userId" integer, "tenantId" integer, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_log_id" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_user_roles" PRIMARY KEY ("userId","roleId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_user_roles_user" ON "user_roles_role" ("userId")`);
    await queryRunner.query(`CREATE INDEX "IDX_user_roles_role" ON "user_roles_role" ("roleId")`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_user_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_todo_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_user_roles_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_user_roles_role" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_user_roles_role"`);
    await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_user_roles_user"`);
    await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_todo_tenant"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_user_tenant"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_roles_role"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_user_roles_user"`);
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
    await queryRunner.query(`DROP TABLE "log"`);
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "tenant"`);
  }
}
