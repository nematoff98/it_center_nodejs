const Router = require('express')
const router = new Router()
const LearnCourseController = require('../../controllers/admin/LearnCourseController')

router.get('/', LearnCourseController.get)
router.post('/', LearnCourseController.create)
router.put('/:id', LearnCourseController.update)
router.delete('/:id', LearnCourseController.delete)

module.exports = router
