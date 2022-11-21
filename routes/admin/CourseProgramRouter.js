const Router = require('express')
const router = new Router()
const CourseProgramController = require('../../controllers/admin/CourseProgramController')

router.get('/', CourseProgramController.get)
router.post('/', CourseProgramController.create)
router.put('/:id', CourseProgramController.update)
router.delete('/:id', CourseProgramController.delete)

module.exports = router
