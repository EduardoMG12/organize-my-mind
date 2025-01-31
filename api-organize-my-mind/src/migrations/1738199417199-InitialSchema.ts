import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1738199417199 implements MigrationInterface {
    name = 'InitialSchema1738199417199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`annotations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`position\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`challenge_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`completion_date\` date NOT NULL, \`note\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`challengeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`challenges\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`frequency\` int NOT NULL, \`next_due_date\` date NOT NULL, \`priority\` int NOT NULL DEFAULT '0', \`position\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`goals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`deadline\` date NULL, \`priority\` int NOT NULL DEFAULT '0', \`position\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`annotations\` ADD CONSTRAINT \`FK_555aa1da91c3859054fbf8bc400\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`challenge_history\` ADD CONSTRAINT \`FK_7dca0e6d15425bfedc65a9bb908\` FOREIGN KEY (\`challengeId\`) REFERENCES \`challenges\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`challenges\` ADD CONSTRAINT \`FK_71457d92a08a52ceaa85edb01c4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_57dd8a3fc26eb760d076bf8840e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_57dd8a3fc26eb760d076bf8840e\``);
        await queryRunner.query(`ALTER TABLE \`challenges\` DROP FOREIGN KEY \`FK_71457d92a08a52ceaa85edb01c4\``);
        await queryRunner.query(`ALTER TABLE \`challenge_history\` DROP FOREIGN KEY \`FK_7dca0e6d15425bfedc65a9bb908\``);
        await queryRunner.query(`ALTER TABLE \`annotations\` DROP FOREIGN KEY \`FK_555aa1da91c3859054fbf8bc400\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`goals\``);
        await queryRunner.query(`DROP TABLE \`challenges\``);
        await queryRunner.query(`DROP TABLE \`challenge_history\``);
        await queryRunner.query(`DROP TABLE \`annotations\``);
    }

}
