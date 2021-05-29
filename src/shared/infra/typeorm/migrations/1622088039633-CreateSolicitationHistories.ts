import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSolicitationHistories1622088039633
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'solicitation_histories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'solicitation_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['APPROVED', 'PENDING', 'REFUSED', 'MORE_INFORMATION'],
          },
          {
            name: 'created_by',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UserSolicitationHistory',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['created_by'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Solicitation',
            referencedTableName: 'solicitations',
            referencedColumnNames: ['id'],
            columnNames: ['solicitation_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('solicitation_histories');
  }
}
