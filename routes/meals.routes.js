const controllerMeals = require('../controllers/meals.controller')
const express = require('express')
const verifyToken = require('../middleware/validateToken.middleware')
const router = express.Router()

router.post('/', verifyToken.verifyToken, verifyToken.isAdmin, controllerMeals.createMeals)
router.get('/', controllerMeals.getMeals)
router.get('/:mealsId', controllerMeals.getMealsId)
router.put('/:mealsId', [verifyToken.verifyToken, verifyToken.isAdmin], controllerMeals.updateMealsById)
router.delete('/:mealsId', [verifyToken.verifyToken, verifyToken.isAdmin], controllerMeals.deleteMealsById)

module.exports = router