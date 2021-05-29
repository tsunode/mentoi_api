import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableDocumentRemoveColumns1622171176289
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" ALTER COLUMN "viewed" SET DEFAULT false`,
    );

    await queryRunner.dropColumn('documents', 'file_name');

    await queryRunner.addColumns('documents', [
      new TableColumn({
        name: 'file_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      'documents',
      new TableForeignKey({
        name: 'documentsFiles',
        columnNames: ['file_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" ALTER COLUMN "viewed" SET DEFAULT NULL`,
    );

    await queryRunner.dropForeignKey('documents', 'documentsFiles');

    await queryRunner.dropColumn('documents', 'file_id');

    await queryRunner.addColumn(
      'documents',
      new TableColumn({
        name: 'file_name',
        type: 'uuid',
      }),
    );
  }
}
