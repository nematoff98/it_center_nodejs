const Router = require('express')
const router = new Router()
const MoreInfoController = require('../../controllers/client/MoreInfoController')

router.get('/', MoreInfoController.get)

module.exports = router
