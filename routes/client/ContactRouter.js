const Router = require('express')
const router = new Router()

const contactController = require('../../controllers/client/ContactController')

router.get('/', contactController.get)

module.exports = router
