const express = require('express');

const {options}= require('./options/config.js')

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const productsRoute = require('./modules/routes/products')
const messagesRoute = require('./modules/routes/messages');

const Container = require('./modules/container/productContainer');
const Chat = require('./modules/container/chatContainer');

const products = new Container(options.mysql,"productos")
const messages = new Chat(options.sqlite,"chat")

const { table } = require('console');


const { json, urlencoded, static } = express;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(static('public'));

app.use('/', productsRoute)
app.use('/mensajes', messagesRoute)

const server = httpServer.listen(PORT, () => {
    console.log(`listen in http://localhost:${server.address().port}`);
});

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


