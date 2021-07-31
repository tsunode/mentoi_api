import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAnswersOnDeleleteUser1627696383173
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE answers ALTER COLUMN user_id DROP NOT NULL;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE answers ALTER COLUMN user_id SET NOT NULL;',
    );
  }
}
