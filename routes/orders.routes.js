const ordersController = require('../controllers/orders.controller')
const express = require('express')
const verifyToken = require('../middleware/validateToken.middleware')
const router = express.Router()

router.post('/', verifyToken.verifyToken, ordersController.createOrder)
router.get('/', [verifyToken.verifyToken, verifyToken.isAdmin], ordersController.getOrders)
router.get('/user', verifyToken.verifyToken, ordersController.getOrderUsers)
router.put('/:orderId', [verifyToken.verifyToken, verifyToken.isAdmin], ordersController.updateOrder)
router.delete('/:orderId', [verifyToken.verifyToken, verifyToken.isAdmin], ordersController.deleteOrder)

module.exports = router