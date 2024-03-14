import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'parts_links'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('parts_id').notNullable().unsigned().references('id').inTable('parts').onDelete('CASCADE')
      table.integer('parts_rel_id').notNullable().unsigned().references('id').inTable('parts').onDelete('CASCADE')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
