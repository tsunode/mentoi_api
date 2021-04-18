import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateQuestionsFiles1618634926495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions_files',
        columns: [
          {
            name: 'question_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'file_id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
          },
        ],
        foreignKeys: [
          {
            name: 'question',
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            columnNames: ['question_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'file',
            referencedTableName: 'files',
            referencedColumnNames: ['id'],
            columnNames: ['file_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions_files');
  }
}
