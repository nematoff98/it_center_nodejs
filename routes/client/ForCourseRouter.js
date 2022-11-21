const Router = require('express')
const router = new Router()
const ForCourseController = require('../../controllers/client/ForCourseController')

router.get('/', ForCourseController.get)

module.exports = router
