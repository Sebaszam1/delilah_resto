const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' })
  }
  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verify
    next()
  } catch (error) {
    res.status(400).json({ error: 'token no válido' })
  }
}

const isAdmin = async (req, res, next) => {
  const token = req.header('Authorization')
  const verify = jwt.verify(token, process.env.TOKEN_SECRET)
  if (verify.id_role === 1) {
    next()
    return
  }
  return res.status(403).json({ message: 'No posees permisos de administrador' })
}

exports.verifyToken = verifyToken
exports.isAdmin = isAdmin
