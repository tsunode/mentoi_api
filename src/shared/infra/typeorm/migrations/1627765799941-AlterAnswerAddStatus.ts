import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAnswerAddStatus1627765799941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('answers', [
      new TableColumn({
        name: 'status',
        type: 'SMALLINT',
        default: 1,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('answers', 'status');
  }
}
