import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSolicitationsOnDeleteUser1627762043403
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE solicitations ALTER COLUMN user_id DROP NOT NULL;
        ALTER TYPE solicitations_type_enum ADD VALUE 'COMPLAINT';
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE solicitations ALTER COLUMN user_id SET NOT NULL;
      `,
    );
  }
}
