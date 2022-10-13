const express = require('express');
const app = express();
const router = require('../routes/products_routes');
const routerCart = require('../routes/carts_routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',router);
app.use('/api/cart',routerCart)
app.get('*', (req, res) => {
    res.json({error: 404, Descripcion: `ruta:${req.url} método:${req.method} no implementada ` });
})


const PORT = process.env.PORT || 8080
const conectServer = app.listen(PORT, (error)=> {
    if(error) console.log(error);
    console.log(`El servidor está escuchando en el puerto ${conectServer.address().port}`);
})