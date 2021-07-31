import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterQuestionsOnDeleleteUser1627694772412
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('questions', 'UserQuestions');
    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        name: 'UserQuestions',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
    await queryRunner.query(
      'ALTER TABLE questions ALTER COLUMN user_id DROP NOT NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('questions', 'UserQuestions');
    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        name: 'UserQuestions',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.query(
      'ALTER TABLE questions ALTER COLUMN user_id SET NOT NULL;',
    );
  }
}
