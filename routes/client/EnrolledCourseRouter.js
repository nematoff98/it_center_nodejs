const Router = require('express')
const router = new Router()
const EnrolledUserCreate = require('../../controllers/client/EnrollerCourseController')

router.post('/', EnrolledUserCreate.create)

module.exports = router
