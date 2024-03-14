/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.resource('parts', '#controllers/parts_controller').apiOnly()
router.get('parts/:id/related', '#controllers/parts_controller.related')
