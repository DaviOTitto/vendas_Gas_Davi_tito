
const bodyParser = require("body-parser");
const express = require("express");

const db = require('./src/configs/sequelize')
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

db.sequelize.sync({alter: true }).then(() => {
    console.log("deucerto a criação do banco")
})
require('./src/produtos/routes')(app)
require('./src/user/routes')(app)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html")

})
app.get("/produto", (req, res) => {
    res.sendFile(__dirname + "/public/views/produtos.html")

})
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/views/login.html")
})
app.get("/cadastro_produtos", (req, res) => {
    res.sendFile(__dirname + "/public/views/cadastro_produtos.html")
})
app.get("/cadastro_clientes", (req, res) => {
    res.sendFile(__dirname + "/public/views/cadastro_cliente.html")
})
app.get("/busca_clientes", (req, res) => {
    res.sendFile(__dirname + "/public/views/mostra_clientes.html")
})


db.sequelize.sync({ alter : true }).then(() => {
    console.log("Deu certo a criação do banco (DROP E/OU CREATE")
})




//-------------------------------
/*
const auth = require('/controlers/authController');
const  botao = require('./link_botao');
app.use('/auth', auth);
app.use('/bot',botao)

app.get('/chamada_nomes', (req, res) => {
res.json({
    clientes: [{
        nome:"Davi",
        idade: 23,
        cpf:"301.276.267-19",
        cep:'38022-190'
    },{
        nome:"frederico",
        idade:39,
        cpf:"108.782.245-18",
        cep:'17022-190'
    }]
    
})

})
*/

var server = app.listen(3000, () => {
    console.log("servidor rodando na porta " + server.address.port + "no host" + server.address().address)
});





//-------------------------------
/*
const auth = require('/controlers/authController');
const  botao = require('./link_botao');
app.use('/auth', auth);
app.use('/bot',botao)

app.get('/chamada_nomes', (req, res) => {
res.json({
    clientes: [{
        nome:"Davi",
        idade: 23,
        cpf:"301.276.267-19",
        cep:'38022-190'
    },{
        nome:"frederico",
        idade:39,
        cpf:"108.782.245-18",
        cep:'17022-190'
    }]
    
})

})
*/

var server = app.listen(3004, () => {
    console.log("servidor rodando na porta " + server.address.port + "no host" + server.address().address)
});