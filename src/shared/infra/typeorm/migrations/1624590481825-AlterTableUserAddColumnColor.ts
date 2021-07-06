import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableUserAddColumnColor1624590481825
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'color',
        type: 'varchar',
        length: '7',
        default: "'#EDB12A'",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'color');
  }
}
