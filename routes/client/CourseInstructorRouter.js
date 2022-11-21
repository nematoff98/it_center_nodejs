const Router = require('express')
const router = new Router()
const CourseInstructor = require('../../controllers/client/CourseInstructorController')

router.get('/', CourseInstructor.get)

module.exports = router
