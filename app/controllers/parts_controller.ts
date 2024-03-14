import Part from '#models/part'
import type { HttpContext } from '@adonisjs/core/http'

export default class PartsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Part.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const body = request.body()
    return await Part.create(body)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Part.find(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const body = request.body()
    const part = await Part.find(params.id)
    await part?.merge(body).save()
    return { success: true }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const part = await Part.find(params.id)
    return await part?.delete()
  }

  public related({ request }: HttpContext) {
    const id = request.param('id')
    return Part.query().withScopes((scope) => scope.relatedParts(id))
  }
}
