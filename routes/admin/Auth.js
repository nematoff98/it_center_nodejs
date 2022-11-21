const {Router} = require('express')
const router = Router()
const Auth = require('../../controllers/admin/Auth')

router.post('/login', Auth.login)
router.post('/registration', Auth.registration)
router.post('/refresh', Auth.refreshToken)


module.exports = router
