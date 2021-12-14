const db = require("./../configs/sequelize")
const { Model, DataTypes } = db.Sequelize
const sequelize = db.sequelize

class User extends Model { }
User.init({
    nome: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    },
    cpf: {
      type:DataTypes.STRING
    },
  cep: {
        type:DataTypes.STRING
      },
  email: {
        type:DataTypes.STRING
      },

}, { sequelize, modelName: "users" }
)

module.exports = User