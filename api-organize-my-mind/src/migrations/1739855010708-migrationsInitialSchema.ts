import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationsInitialSchema1739855010708 implements MigrationInterface {
    name = 'MigrationsInitialSchema1739855010708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`bio\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`annotations\` (\`id\` varchar(36) NOT NULL, \`content\` text NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`visibility\` enum ('public', 'private', 'friends_only') NOT NULL DEFAULT 'PRIVATE', \`position\` int NOT NULL DEFAULT '0', \`activy\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`annotations\` ADD CONSTRAINT \`FK_039c42bd7b1b5bd7bb49e91de31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annotations\` DROP FOREIGN KEY \`FK_039c42bd7b1b5bd7bb49e91de31\``);
        await queryRunner.query(`DROP TABLE \`annotations\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
