import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationsBuild1740592325558 implements MigrationInterface {
    name = 'MigrationsBuild1740592325558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`annotations\` (\`id\` varchar(36) NOT NULL, \`content\` text NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`visibility\` enum ('public', 'private', 'friends_only') NOT NULL DEFAULT 'PRIVATE', \`position\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` date NULL, \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`bio\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`flashcard_collection\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`visibility\` varchar(255) NOT NULL, \`position\` int NOT NULL, \`isActive\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` date NULL, \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`flashcard\` (\`id\` varchar(36) NOT NULL, \`front\` text NOT NULL, \`back\` text NOT NULL, \`description\` varchar(255) NULL, \`position\` int NOT NULL, \`isActive\` tinyint NOT NULL, \`flashcardsId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`annotations\` ADD CONSTRAINT \`FK_039c42bd7b1b5bd7bb49e91de31\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flashcard_collection\` ADD CONSTRAINT \`FK_430628574ad5f0f7d152d544171\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flashcard\` ADD CONSTRAINT \`FK_74243c246b92676baa4c059fce8\` FOREIGN KEY (\`flashcardsId\`) REFERENCES \`flashcard_collection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`flashcard\` DROP FOREIGN KEY \`FK_74243c246b92676baa4c059fce8\``);
        await queryRunner.query(`ALTER TABLE \`flashcard_collection\` DROP FOREIGN KEY \`FK_430628574ad5f0f7d152d544171\``);
        await queryRunner.query(`ALTER TABLE \`annotations\` DROP FOREIGN KEY \`FK_039c42bd7b1b5bd7bb49e91de31\``);
        await queryRunner.query(`DROP TABLE \`flashcard\``);
        await queryRunner.query(`DROP TABLE \`flashcard_collection\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`annotations\``);
    }

}
