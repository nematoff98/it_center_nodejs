const Router = require('express')
const router = new Router()
const LearnCourseController = require('../../controllers/client/LearnCourseController')

router.get('/', LearnCourseController.get)

module.exports = router
