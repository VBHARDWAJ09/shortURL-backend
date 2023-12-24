const express = require('express')
const router = express.Router()
const { loginValidations, registerValidations } = require('../validations/user')
const { loginController, registerController } = require('../controller/user')

router.post('/register', [registerValidations], registerController)
router.post('/login', [loginValidations], loginController)

module.exports = router;