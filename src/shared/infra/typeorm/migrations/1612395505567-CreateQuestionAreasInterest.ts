import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateQuestionAreasInterest1612395505567
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'question_areas_interest',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'question_id',
            type: 'uuid',
          },
          {
            name: 'area_interest_id',
            type: 'uuid',
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
            name: 'area_interest',
            referencedTableName: 'areas_interest',
            referencedColumnNames: ['id'],
            columnNames: ['area_interest_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('question_areas_interest');
  }
}
