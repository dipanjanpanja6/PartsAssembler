import { BaseModel, column, scope } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Part extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare model_link: string

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static relatedParts = scope((query, part_id: number) => {
    query
      .select('parts.*')
      .innerJoin('parts_links', (q) => q.on('parts.id', '=', 'parts_links.parts_rel_id').orOn('parts.id', '=', 'parts_links.parts_id'))
      .where((q) => q.where({ 'parts_links.parts_id': part_id }).orWhere({ 'parts_links.parts_rel_id': part_id }))
      .andWhereNot({ 'parts.id': part_id })
      .groupBy('parts.id')
  })
}
