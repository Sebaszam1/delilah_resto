const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/users.controller')
const verifyToken = require('../middleware/validateToken.middleware')

router.post('/', [verifyToken.verifyToken, verifyToken.isAdmin], userControllers.createUser)
router.get('/', [verifyToken.verifyToken, verifyToken.isAdmin], userControllers.getUsers)
router.get('/:userId', [verifyToken.verifyToken, verifyToken.isAdmin], userControllers.getUsersById)
router.put('/:userId', [verifyToken.verifyToken, verifyToken.isAdmin], userControllers.updateUsersById)
router.delete('/:userId', [verifyToken.verifyToken, verifyToken.isAdmin], userControllers.deleteUserById)

module.exports = router