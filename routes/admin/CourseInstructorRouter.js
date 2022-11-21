const Router = require('express')
const router = new Router()
const CourseInstructorController = require('../../controllers/admin/CourseInstructorController')

router.get('/', CourseInstructorController.get)
router.post('/', CourseInstructorController.create)
router.put('/:id', CourseInstructorController.update)
router.delete('/:id', CourseInstructorController.delete)

module.exports = router
