const Sequelize = require('sequelize')
const path = 'mysql://root:@localhost:3306/delilah_resto'

const sequelize = new Sequelize(path, {
  dialect: 'mysql',
  operatorsAliases: 0,
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  }).catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  })

module.exports = sequelize;