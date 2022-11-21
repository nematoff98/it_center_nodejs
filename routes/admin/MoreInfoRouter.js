const Router = require('express')
const router = new Router()
const MoreInfoController = require('../../controllers/admin/MoreInfoController')

router.get('/', MoreInfoController.get)
router.post('/', MoreInfoController.create)
router.put('/:id', MoreInfoController.update)
router.delete('/:id', MoreInfoController.delete)

module.exports = router
