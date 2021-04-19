import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1608597403507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nick_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'display_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'date_birth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['MALE', 'FEMALE', 'OTHER'],
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'verified',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'document_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'scholarity',
            type: 'enum',
            enum: [
              'ENSINO_FUNDAMENTAL_I',
              'ENSINO_FUNDAMENTAL_C',
              'ENSINO_MEDIO_I',
              'ENSINO_MEDIO_C',
              'TECNICO_I',
              'TECNICO_C',
              'ENSINO_SUPERIOR_I',
              'ENSINO_SUPERIOR_C',
            ],
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['COMMON', 'TEACHER'],
          },
          {
            name: 'permission',
            type: 'enum',
            enum: ['ADMIN', 'MENTOI', 'COMMON'],
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
