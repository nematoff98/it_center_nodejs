const Router = require('express')
const router = new Router()
const MainController = require('../../controllers/admin/MainController')

router.get('/', MainController.get)
router.post('/', MainController.create)
router.put('/:id', MainController.update)
router.delete('/:id', MainController.delete)

module.exports = router
