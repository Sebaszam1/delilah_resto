const sequelize = require('../conexion')

const createMeals = async (req, res) => {
  const { nombre_meal, precio, img } = req.body
  let arrayInsertMeal = [`${nombre_meal}`, `${precio}`, `${img}`]
  try {
    await sequelize.query('INSERT INTO meals (nombre_meal, precio, img) VALUES( ?, ?, ?)',
      { replacements: arrayInsertMeal, type: sequelize.QueryTypes.INSERT })
    res.status(201).json({
      message: 'Plato creado exitosamente'
    });
  } catch (error) {
    if (error.name) {
      res.status(400).json({
        error,
        message: 'error en la creación'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

const getMeals = async (req, res) => {
  try {
    const result = await sequelize.query('SELECT * FROM meals', { type: sequelize.QueryTypes.SELECT })
    res.status(200).json({ result })
  } catch (error) {
    if (error.name) {
      res.status(404).json({
        error,
        message: 'error en la búsqueda'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

const getMealsId = async (req, res) => {
  try {
    const result = await sequelize.query(`SELECT * FROM meals 
        WHERE id_meal = ${req.params.mealsId}`,
      { type: sequelize.QueryTypes.SELECT })
    res.status(200).json({ result })
  } catch (error) {
    if (error.name) {
      res.status(404).json({
        error,
        message: 'error en la búsqueda'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

const updateMealsById = async (req, res) => {
  const { nombre_meal, precio, img } = req.body
  try {
    const result = await sequelize.query(`UPDATE meals 
        SET nombre_meal = "${nombre_meal}",  
        precio = "${precio}", img = "${img}"  
        WHERE id_meal = ${req.params.mealsId}`,
      { type: sequelize.QueryTypes.INSERT })
    res.status(204).json({
      message: 'Plato actulizado',
      result,
    })
  } catch (error) {
    if (error.name) {
      res.status(400).json({
        error,
        message: 'error en la actualización'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

const deleteMealsById = async (req, res) => {
  try {
    const result = await sequelize.query(`DELETE FROM meals WHERE id_meal = ${req.params.mealsId}`)
    res.status(204).json({
      message: 'Plato eliminado',
      result
    })
  } catch (error) {
    if (error.name) {
      res.status(400).json({
        error,
        message: 'error en la eliminación'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

exports.createMeals = createMeals
exports.getMeals = getMeals
exports.getMealsId = getMealsId
exports.updateMealsById = updateMealsById
exports.deleteMealsById = deleteMealsById