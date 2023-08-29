const Express = require('express');
const AppRouter = require('./router/Routes')
const Cors = require('cors')

const App = Express()
const Port = process.env.PORT || 3000

App.use(Express.urlencoded({extended: true}))
App.use(Express.json())
App.use(Cors())
App.use('/', AppRouter)

App.get('/', (req, res) => {
    res.status(200).json(`Comunicación establecida en el puerto ${Port}`)
})

App.listen(Port, () => {
    console.log(`Comunicación establecida en el puerto ${Port}`);
})