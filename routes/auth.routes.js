const authController = require('../controllers/auth.controller')
const express = require('express')
const router = express.Router()

router.post('/login', authController.singIn)
router.post('/register', authController.singUp)

module.exports = router