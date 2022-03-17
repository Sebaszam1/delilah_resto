const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sequelize = require('../conexion')
const validateRegister = require('../libs/validateInputs.libs').schemaRegister
const validateLogin = require('../libs/validateInputs.libs').schemaLogin
require('dotenv').config()

const singIn = async (req, res) => {
  const { error } = validateLogin.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: "Usuario y/o contraseña invalida"
    })
  }
  try {
    let user = await sequelize.query(`SELECT * FROM users WHERE email = '${req.body.email}'`,
      { type: sequelize.QueryTypes.SELECT })
    user = user[0]
    if (!user) {
      return res.status(400).json({ error: 'Usuario y/o contraseña inválida' })
    }
    const validatePassword = await bcrypt.compare(req.body.contrasena, user.contrasena, (err, response) => {
      if (err) {
        return response.status(400)
      }
      if (response) {
        const token = jwt.sign({
          nombre: user.nombre_user,
          id_user: user.id_user,
          id_role: user.id_role
        }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.EXPIRES
        })
        res.status(200).header('Authorization', token).json({
          data: `Bienvenido ${user.nombre_user}`,
          token
        })
      } else {
        return res.status(400).json({ error: 'Usuario y/o contraseña inválida' })
      }
    })
  } catch (error2) {
    res.status(500).json({
      error2,
      message: 'Error inesperado'
    })
  }
}

const singUp = async (req, res) => {
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
    res.status(201).json({
      message: 'Usuario Creado exitosamente',
    })
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

exports.singIn = singIn
exports.singUp = singUp