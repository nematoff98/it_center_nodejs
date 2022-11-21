const Router = require('express')
const router = new Router()
const MainController = require('../../controllers/client/MainController')

router.get('/', MainController.get)

module.exports = router
