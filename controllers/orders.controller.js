const sequelize = require('../conexion')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createOrder = async (req, res) => {
  const { id_user, id_meal, id_forma_pago, id_status } = req.body
  let arrayInsertOrder = [`${id_user}`, `${id_meal}`, `${id_forma_pago}`, `${id_status}`]
  try {
    const result = await sequelize.query('INSERT INTO orders (id_user, id_meal, id_forma_pago, id_status) VALUES( ?, ?, ?, ?)',
      { replacements: arrayInsertOrder, type: sequelize.QueryTypes.INSERT })
    res.status(201).json({
      message: 'orden creada',
      result
    })
  } catch (error) {
    if (error.name) {
      res.status(400).json({
        error,
        message: 'error en la creación del usuario'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

const getOrders = async (req, res) => {
  try {
    const result = await sequelize.query(`SELECT id_order, hora, m.nombre_meal, fp.nombre_forma_pago, u.nombre_user, u.address, u.email, s.nombre_status 
        FROM orders left join users u using(id_user)
        left join meals m using(id_meal)
        left join status s using(id_status)
        left join forma_pago fp using(id_forma_pago)`, { type: sequelize.QueryTypes.SELECT })
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

const getOrderUsers = async (req, res) => {
  const token = req.header('Authorization')
  const verify = jwt.verify(token, process.env.TOKEN_SECRET)
  try {
    const result = await sequelize.query(`SELECT id_order, hora, m.nombre_meal, fp.nombre_forma_pago, u.nombre_user, u.address, u.email, s.nombre_status 
        FROM orders left join users u using(id_user)
        left join meals m using(id_meal)
        left join status s using(id_status)
        left join forma_pago fp using(id_forma_pago) WHERE id_user = ${verify.id_user}`,
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

const updateOrder = async (req, res) => {
  const { id_status } = req.body
  try {
    const result = await sequelize.query(`UPDATE orders 
        SET id_status = "${id_status}" 
        WHERE id_order = ${req.params.orderId}`,
      { type: sequelize.QueryTypes.INSERT })
    res.status(204).json({
      message: 'orden actulizada',
      result
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

const deleteOrder = async (req, res) => {
  try {
    const result = await sequelize.query(`DELETE FROM orders WHERE id_order = ${req.params.orderId}`)
    res.status(204).json({
      message: 'orden eliminada',
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

exports.createOrder = createOrder
exports.getOrders = getOrders
exports.getOrderUsers = getOrderUsers
exports.updateOrder = updateOrder
exports.deleteOrder = deleteOrder