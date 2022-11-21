const Router = require('express')
const router = new Router()
const ForCourseController = require('../../controllers/admin/ForCourseController')

router.get('/', ForCourseController.get)
router.post('/', ForCourseController.create)
router.put('/:id', ForCourseController.update)
router.delete('/:id', ForCourseController.delete)

module.exports = router
