const db = require("./../configs/sequelize")
const { Model, DataTypes } = db.Sequelize
const sequelize = db.sequelize

class Produtos extends Model { }
Produtos.init({
    nome: {
        type: DataTypes.STRING
    },
   valor: {
        type: DataTypes.STRING
    }
}, { sequelize, modelName: "produtos" }
)

module.exports = Produtos