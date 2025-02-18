const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class MigrationsInitialSchema1739804437227 {
    name = 'MigrationsInitialSchema1739804437227'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`item_types\` (\`id\` varchar(36) NOT NULL, \`name\` enum ('annotation', 'flashcards', 'habit', 'goal', 'challenge') NOT NULL, UNIQUE INDEX \`IDX_3398f4e6d19a6c8f40ae691641\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`items\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`visibility\` varchar(255) NOT NULL DEFAULT 'PRIVATE', \`position\` int NOT NULL DEFAULT '0', \`activy\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`ownerId\` varchar(36) NULL, \`typeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`bio\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item_groups\` (\`id\` varchar(36) NOT NULL, \`visibility\` varchar(255) NOT NULL DEFAULT 'PRIVATE', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`ownerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shared_item_groups\` (\`id\` varchar(36) NOT NULL, \`permission\` varchar(20) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`groupId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shared_items\` (\`id\` varchar(36) NOT NULL, \`permission\` varchar(20) NOT NULL, \`shared_link\` varchar(255) NULL, \`expiration\` timestamp NULL, \`max_uses\` int NULL, \`uses\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`itemId\` varchar(36) NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_1bb22b49902919ce1864920acd\` (\`shared_link\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`habits\` (\`id\` int NOT NULL AUTO_INCREMENT, \`frequency\` varchar(255) NOT NULL, \`completed_today\` tinyint NOT NULL DEFAULT 0, \`itemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`goals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deadline\` date NULL, \`completed\` tinyint NOT NULL DEFAULT 0, \`priority\` int NOT NULL DEFAULT '0', \`position\` int NOT NULL DEFAULT '0', \`itemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`flashcards_set\` (\`id\` int NOT NULL AUTO_INCREMENT, \`itemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`flash_cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`front\` varchar(255) NOT NULL, \`back\` varchar(255) NOT NULL, \`setId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`challenges\` (\`id\` int NOT NULL AUTO_INCREMENT, \`frequency\` int NOT NULL, \`next_due_date\` date NOT NULL, \`priority\` int NOT NULL DEFAULT '0', \`itemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`annotations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NULL, \`itemId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item_groups_items_items\` (\`itemGroupsId\` varchar(36) NOT NULL, \`itemsId\` varchar(36) NOT NULL, INDEX \`IDX_f325b2feed6e0d35bb9e5c11c9\` (\`itemGroupsId\`), INDEX \`IDX_0e0416aad9deea8587dbe0fabc\` (\`itemsId\`), PRIMARY KEY (\`itemGroupsId\`, \`itemsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_0831f71549426dcdff6c67c9b78\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`items\` ADD CONSTRAINT \`FK_320084ab9c4f93a78ae873119c1\` FOREIGN KEY (\`typeId\`) REFERENCES \`item_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_groups\` ADD CONSTRAINT \`FK_cce548dbd6fea76da545e3ba290\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shared_item_groups\` ADD CONSTRAINT \`FK_4759fc29f4c6b7ae52417a24698\` FOREIGN KEY (\`groupId\`) REFERENCES \`item_groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shared_item_groups\` ADD CONSTRAINT \`FK_48f4fe33c1e6c0de491bddad20a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shared_items\` ADD CONSTRAINT \`FK_3d00d5cd77d403225e5431f3f3c\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`shared_items\` ADD CONSTRAINT \`FK_c811ee2a97ee2a937f55900f0a9\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`habits\` ADD CONSTRAINT \`FK_b742bcfa37634f0f6e40729ae05\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goals\` ADD CONSTRAINT \`FK_22f2d245d29570801c51ed343a9\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flashcards_set\` ADD CONSTRAINT \`FK_d02029426b7be677ddf2f830ed1\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`flash_cards\` ADD CONSTRAINT \`FK_d3ce896f39065396749f408871d\` FOREIGN KEY (\`setId\`) REFERENCES \`flashcards_set\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`challenges\` ADD CONSTRAINT \`FK_c30018c2b31fad1189ae79cc9ab\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`annotations\` ADD CONSTRAINT \`FK_c153773f731e9fd902eb07eec3b\` FOREIGN KEY (\`itemId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_groups_items_items\` ADD CONSTRAINT \`FK_f325b2feed6e0d35bb9e5c11c9c\` FOREIGN KEY (\`itemGroupsId\`) REFERENCES \`item_groups\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`item_groups_items_items\` ADD CONSTRAINT \`FK_0e0416aad9deea8587dbe0fabcb\` FOREIGN KEY (\`itemsId\`) REFERENCES \`items\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`
            INSERT INTO \`item_types\` (id, name)
            VALUES 
              (UUID(), 'annotation'),
              (UUID(), 'flashcards'),
              (UUID(), 'habit'),
              (UUID(), 'goal'),
              (UUID(), 'challenge')
          `);
          
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`item_groups_items_items\` DROP FOREIGN KEY \`FK_0e0416aad9deea8587dbe0fabcb\``);
        await queryRunner.query(`ALTER TABLE \`item_groups_items_items\` DROP FOREIGN KEY \`FK_f325b2feed6e0d35bb9e5c11c9c\``);
        await queryRunner.query(`ALTER TABLE \`annotations\` DROP FOREIGN KEY \`FK_c153773f731e9fd902eb07eec3b\``);
        await queryRunner.query(`ALTER TABLE \`challenges\` DROP FOREIGN KEY \`FK_c30018c2b31fad1189ae79cc9ab\``);
        await queryRunner.query(`ALTER TABLE \`flash_cards\` DROP FOREIGN KEY \`FK_d3ce896f39065396749f408871d\``);
        await queryRunner.query(`ALTER TABLE \`flashcards_set\` DROP FOREIGN KEY \`FK_d02029426b7be677ddf2f830ed1\``);
        await queryRunner.query(`ALTER TABLE \`goals\` DROP FOREIGN KEY \`FK_22f2d245d29570801c51ed343a9\``);
        await queryRunner.query(`ALTER TABLE \`habits\` DROP FOREIGN KEY \`FK_b742bcfa37634f0f6e40729ae05\``);
        await queryRunner.query(`ALTER TABLE \`shared_items\` DROP FOREIGN KEY \`FK_c811ee2a97ee2a937f55900f0a9\``);
        await queryRunner.query(`ALTER TABLE \`shared_items\` DROP FOREIGN KEY \`FK_3d00d5cd77d403225e5431f3f3c\``);
        await queryRunner.query(`ALTER TABLE \`shared_item_groups\` DROP FOREIGN KEY \`FK_48f4fe33c1e6c0de491bddad20a\``);
        await queryRunner.query(`ALTER TABLE \`shared_item_groups\` DROP FOREIGN KEY \`FK_4759fc29f4c6b7ae52417a24698\``);
        await queryRunner.query(`ALTER TABLE \`item_groups\` DROP FOREIGN KEY \`FK_cce548dbd6fea76da545e3ba290\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_320084ab9c4f93a78ae873119c1\``);
        await queryRunner.query(`ALTER TABLE \`items\` DROP FOREIGN KEY \`FK_0831f71549426dcdff6c67c9b78\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e0416aad9deea8587dbe0fabc\` ON \`item_groups_items_items\``);
        await queryRunner.query(`DROP INDEX \`IDX_f325b2feed6e0d35bb9e5c11c9\` ON \`item_groups_items_items\``);
        await queryRunner.query(`DROP TABLE \`item_groups_items_items\``);
        await queryRunner.query(`DROP TABLE \`annotations\``);
        await queryRunner.query(`DROP TABLE \`challenges\``);
        await queryRunner.query(`DROP TABLE \`flash_cards\``);
        await queryRunner.query(`DROP TABLE \`flashcards_set\``);
        await queryRunner.query(`DROP TABLE \`goals\``);
        await queryRunner.query(`DROP TABLE \`habits\``);
        await queryRunner.query(`DROP INDEX \`IDX_1bb22b49902919ce1864920acd\` ON \`shared_items\``);
        await queryRunner.query(`DROP TABLE \`shared_items\``);
        await queryRunner.query(`DROP TABLE \`shared_item_groups\``);
        await queryRunner.query(`DROP TABLE \`item_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`items\``);
        await queryRunner.query(`DROP INDEX \`IDX_3398f4e6d19a6c8f40ae691641\` ON \`item_types\``);
        await queryRunner.query(`DROP TABLE \`item_types\``);
    }
}
