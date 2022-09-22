const express= require('express');
const productos = require('./productos')
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', productos);
app.use(express.static("./public"));

app.get('/',(req,res)=>{
    res.send('Hola')
})

app.listen(8080,()=>{console.log("Escuchando")});