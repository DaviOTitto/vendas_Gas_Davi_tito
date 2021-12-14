module.exports = (app) =>
{
const controler = require ("./controler")

app.post('/produtos',controler.create)
 
app.get('/produtos',controler.findAll)
app.put('/produtos',controler.update)
app.delete('/produtos', controler.remove) 
app.put('/produtos',controler.update)
}