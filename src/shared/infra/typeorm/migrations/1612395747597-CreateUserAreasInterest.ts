import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserAreasInterest1612395747597
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_areas_interest',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'area_interest_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'users',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
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
    await queryRunner.dropTable('user_areas_interest');
  }
}
