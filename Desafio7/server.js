const express = require('express')
const { Router } = express
const { options } = require( './options/connectOptions.js')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const router = Router()

const handlebars = require('express-handlebars')

const Contenedor = require('./container')
const productos= new Contenedor (options.mysql,  "productos")

const Chat = require('./chat')
const msjs = new Chat ("chat")

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

const bp = require('body-parser')
const { SocketAddress } = require('net')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.engine('hbs', 
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials/'
    })
)

app.set('view engine', 'hbs');
app.set('views', './views')

app.use(express.static('./public'))

app.use('', router)

router.get("/", async (req, res) => {
    const products = await productos.getAll()
    let productExists = false
    await products ? productExists = true : productExists = false
    
    res.render( 'main', {products, productExists})
    // res.json( {products})
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const productDetail = productos.getById(id)
    res.json(await productDetail)
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const productData = req.body
    res.json(await productos.editById(id, productData))
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    res.json(await productos.deleteById({'id': id}))
})

httpServer.listen(PORT, ()=>{ console.log('Server On') })


io.on('connection', async socket=>{
    const products = await productos.getAll()
    const messages = await msjs.getMsj()
    
    console.log("usuario conectado");
    socket.emit("products-sv", products)
    socket.on('add-product', async (data)=>{
                await productos.addProduct(data)
                io.sockets.emit('products-sv', await productos.getAll())
            }
    )
    socket.emit("messages", messages)
    socket.on("new-message", async (data)=>{
            await msjs.addMsj(data)
            io.sockets.emit("messages-sv", await msjs.getMsj())
        
    })
    

})



