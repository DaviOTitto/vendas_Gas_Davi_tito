const db = require('./../configs/sequelize')
const Produtos = require("./model")
const {Op} = db.Sequelize
exports.create = (req, res)=> {
    Produtos.create({
        nome : req.body.nome,
        valor: req.body.valor
    }).then((produtos) =>{
        res.send(produtos)
    })
}
exports.findAll = (req, res) => {
    let nome = ''
    if(req.query.nome)
         nome = req.query.nome
    Produtos.findAll({ where : {nome: {[Op.like] :  '%' + nome + '%'}}, order: ['createdAt']}).then(produtos => {
        res.send(produtos)
    })
}

exports.update =(req, res) =>{
    Produtos.update({nome: req.body.nome}, 
      
        {where : {id: req.body.id}}
        ).then(() =>
        res.send({'message' : 'ok'}))
    }

exports.remove =(req,res) =>
{
    Produtos.destroy({
        where :{
            id: req.body.id
        }
    }).then((affectRows)=>{
        res.send({'message' : 'ok' , 'affectedRows' : affectRows})
    })
}