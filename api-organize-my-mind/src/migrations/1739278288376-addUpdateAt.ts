import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUpdateAt1739278288376 implements MigrationInterface {
    name = 'AddUpdateAt1739278288376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annotations\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`challenge_history\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`challenges\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goals\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`challenges\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`challenge_history\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`annotations\` DROP COLUMN \`updated_at\``);
    }

}
