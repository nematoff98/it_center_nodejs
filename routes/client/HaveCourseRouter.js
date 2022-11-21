const Router = require('express')
const router = new Router()
const HaveCourseController = require('../../controllers/client/HaveCourseController')

router.get('/', HaveCourseController.get)

module.exports = router
