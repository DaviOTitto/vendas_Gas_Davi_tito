const db =require('./../configs/sequelize')
const User = require("./model")
const {Op} = db.Sequelize
exports.create = (req, res)=> {
    User.create({
       nome : req.body.nome,
       senha: req.body.senha,
       cpf: req.body.cpf,
       cep: req.body.cep,
       email: req.body.email
    }).then((user) =>{
        res.send(user)
    })
}
exports.findAll = (req, res) => {
    let nome = ''
    if(req.query.nome)
         nome = req.query.nome
    User.findAll({ where : {nome: {[Op.like] :  '%' + nome + '%'}}, order: ['createdAt']}).then(user => {
        res.send(user)
    })
}

exports.update =(req, res) =>{
    User.update({nome: req.body.nome}, 
      
        {where : {id: req.body.id}}
        ).then(() =>
        res.send({'message' : 'ok'}))
    }

exports.remove =(req,res) =>
{
    User.destroy({
        where :{
            id: req.body.id
        }
    }).then((affectRows)=>{
        res.send({'message' : 'ok' , 'affectedRows' : affectRows})
    })
}