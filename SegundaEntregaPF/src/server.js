import express, { json } from "express";
import products from "./routes/productsRoute.js"
import cart from "./routes/cartRoute.js"
import connect from "./config/mongoConnect.js";


// ---- server config ----//
const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());
connect();

// ---------//

// ---- routes ---- //
app.use('/memory/productos', products);
app.use('/memory/carrito', cart);

app.use('/fs/productos', products);
app.use('/fs/carrito', cart);

app.use('/firebase/productos', products);
app.use('/firebase/carrito', cart);

app.use('/mongodb/productos', products);
app.use('/mongodb/carrito', cart);

app.use('/sqlite/productos', products);
app.use('/sqlite/carrito', cart);
// ---------//


const server = app.listen(PORT, () => {
    console.log(`Listen in http://localhost:${server.address().port}`);
});