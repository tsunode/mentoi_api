import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterQuestionAddStatus1627764422226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('questions', [
      new TableColumn({
        name: 'status',
        type: 'SMALLINT',
        default: 1,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('questions', 'status');
  }
}
