const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3000

const authRouter = require('./routes/auth.routes')
const mealsRouter = require('./routes/meals.routes')
const usersRouter = require('./routes/users.routes')
const orderRoutes = require('./routes/orders.routes')

const app = express()
app.use(helmet())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1/auth', authRouter)
app.use('/v1/meals', mealsRouter)
app.use('/v1/users', usersRouter)
app.use('/v1/orders', orderRoutes)

app.listen(PORT, () => {
  console.log(`Aplicacion lista por puerto ${PORT}`);
})

module.exports = app