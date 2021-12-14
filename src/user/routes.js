module.exports = (app) =>
{
const controler = require ("./controler")

app.post('/usuarios',controler.create)
 
app.get('/usuarios',controler.findAll)
app.put('/usuarios',controler.update)
app.delete('/usuarios', controler.remove) 
app.put('/usuarios',controler.update)
}