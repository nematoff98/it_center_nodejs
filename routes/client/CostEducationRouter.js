const Router = require('express')
const router = new Router()
const CostEducationController = require('../../controllers/client/CostEducationController')

router.get('/', CostEducationController.get)

module.exports = router
