import app from '@adonisjs/core/services/app'
import emitter from '@adonisjs/core/services/emitter'
import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'

emitter.on('db:query', (query) => {
  if (app.inProduction) {
    logger.debug(`${query.sql} << [${query.bindings?.toString()}]`)
  } else {
    db.prettyPrint(query)
  }
})
