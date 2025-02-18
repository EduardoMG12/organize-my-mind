import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationsInitialSchema1739906994687 implements MigrationInterface {
    name = 'MigrationsInitialSchema1739906994687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annotations\` CHANGE \`visibility\` \`visibility\` enum ('public', 'private', 'friends_only') NOT NULL DEFAULT 'PRIVATE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annotations\` CHANGE \`visibility\` \`visibility\` enum ('public', 'private', 'friends_only') NOT NULL DEFAULT 'private'`);
    }

}
