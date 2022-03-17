const sequelize = require('../conexion')
const bcrypt = require('bcrypt')
const validateRegister = require('../libs/validateInputs.libs').schemaRegister

const createUser = async (req, res) => {
  const { nombre_user, email, phone, address, contrasena, id_role } = req.body
  const { error } = validateRegister.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    })
  }
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(contrasena, salt)
  let arrayInsertUser = [`${nombre_user}`, `${email}`, `${phone}`, `${address}`, `${passwordHash}`, `${id_role}`]
  try {
    await sequelize.query('INSERT INTO users (nombre_user, email, phone, address, contrasena, id_role) VALUES( ?, ?, ?, ?, ?, ?)',
      { replacements: arrayInsertUser, type: sequelize.QueryTypes.INSERT })
    res.status(201).json({ message: 'Usuario creado exitosamente' })
  } catch (error2) {
    if (error2.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        message: 'Usuario ya existe'
      })
    } else {
      res.status(500).json({
        error2
      })
    }
  }
}

const getUsers = async (req, res) => {
  try {
    const result = await sequelize.query('SELECT * FROM users', { type: sequelize.QueryTypes.SELECT })
    res.status(200).json({ result })
  } catch (error) {
    if (error.name) {
      res.status(404).json({
        error,
        message: 'Usuarios no encontrados'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

const getUsersById = async (req, res) => {
  try {
    const result = await sequelize.query(`SELECT * FROM users 
        WHERE id_user = ${req.params.userId}`,
      { type: sequelize.QueryTypes.SELECT })
    res.status(200).json({ result })
  } catch (error) {
    if (error.name) {
      res.status(404).json({
        error,
        message: 'Usuario no encontrado'
      })
    } else {
      res.status(500).json({
        error,
        message: 'Error inesperado'
      })
    }
  }
}

const updateUsersById = async (req, res) => {
  const { id_role } = req.body
  try {
    await sequelize.query(`UPDATE users 
        SET id_role = ${id_role} WHERE id_user = ${req.params.userId}`,
      { type: sequelize.QueryTypes.UPDATE })
    res.status(201).json({
      message: 'Usuario actualizado exitosamente'
    })
  } catch (error) {
    if (error.name) {
      res.status(400).json({
        message: 'Error en la actualización',
        error
      })
    } else {
      res.status(500).json({
        message: 'Error inesperado',
        error
      })
    }
  }
}

const deleteUserById = async (req, res) => {
  try {
    const result = await sequelize.query(`DELETE FROM users WHERE id_user = ${req.params.userId}`)
    res.status(201).json({
      message: 'Usuario eliminado exitosamente'
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

exports.createUser = createUser
exports.getUsers = getUsers
exports.getUsersById = getUsersById
exports.updateUsersById = updateUsersById
exports.deleteUserById = deleteUserById