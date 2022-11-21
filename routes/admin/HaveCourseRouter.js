const Router = require('express')
const router = new Router()
const HaveCourseController = require('../../controllers/admin/HaveCourseController')

router.get('/', HaveCourseController.get)
router.post('/', HaveCourseController.create)
router.put('/:id', HaveCourseController.update)
router.delete('/:id', HaveCourseController.delete)

module.exports = router
