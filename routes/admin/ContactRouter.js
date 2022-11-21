const Router = require('express')
const router = new Router()

const contactController = require('../../controllers/admin/ContactController')

router.get('/', contactController.get)
router.post('/', contactController.create)
router.put('/:id', contactController.update)
router.delete('/:id', contactController.delete)

module.exports = router
