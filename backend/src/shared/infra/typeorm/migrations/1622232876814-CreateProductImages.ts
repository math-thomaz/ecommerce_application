import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductImages1622232876814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products_image",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "image_name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKProductImage",
            referencedTableName: "products",
            referencedColumnNames: ["id"],
            columnNames: ["product_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products_image");
  }
}
