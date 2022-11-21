const Router = require('express')
const router = new Router()
const CostEducationController = require('../../controllers/admin/CostEducationController')

router.get('/', CostEducationController.get)
router.post('/', CostEducationController.create)
router.put('/:id', CostEducationController.update)
router.delete('/:id', CostEducationController.delete)

module.exports = router
