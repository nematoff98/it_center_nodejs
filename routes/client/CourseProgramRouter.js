const Router = require('express')
const router = new Router()
const CourseProgramController = require('../../controllers/client/CourseProgramController')

router.get('/', CourseProgramController.get)

module.exports = router
