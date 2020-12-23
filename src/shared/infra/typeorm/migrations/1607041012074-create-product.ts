import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProduct1607041012074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:'products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'family',
              type: 'varchar',
              isNullable: false
            },
            {
              name:'name',
              type:'varchar',
              isNullable: false
            },
            {
              name:'size',
              type:'varchar',
              isNullable: false
            },
            {
              name:'amount',
              type:'varchar',
              isNullable: false
            },
            {
              name:'box',
              type:'varchar',
              isNullable:false
            },
            {
              name:'lote',
              type:'varchar',
              isNullable: false
            },
            {
              name:'joint',
              type:'varchar',
              isNullable: false
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
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products')
    }

}
