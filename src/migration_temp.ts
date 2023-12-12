import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { migrationGetTableName } from '@veramo/data-store/src/migrations';

//const debug = Debug('veramo:data-store:initial-migration')

/**
 * Create the database layout for Veramo 3.0
 * Temp fix to create missing 'PreMigrationKey' table reference in current Veramo Migrations
 *
 * @public
 */
export class CreateDatabaseBugFix implements MigrationInterface {
  name = 'CreateDatabaseBugFix' // Used in case this class gets minified, which would change the classname

  async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: migrationGetTableName(queryRunner, 'PreMigrationKey'),
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'type', type: 'varchar' },
          { name: 'kid', type: 'varchar' },
        ],
      }),
      true,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error('illegal_operation: cannot roll back initial migration')
  }
}
