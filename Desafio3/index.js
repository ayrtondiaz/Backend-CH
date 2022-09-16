const express = require('express')
const app = express()
const Contenedor = require('./Contenedor')
const PORT = 8080

const products = new Contenedor('./products.txt')

app.get('/productos', (req, res) => {
  res.send(products.getAll())

})
app.get('/productosRandom', (req, res) => {
    res.send(products.getRandom())  
  })
  

app.get('/', (req, res) => {
  res.send('Hola Desafio')
})

app.listen(PORT, () => console.log('El servidor esta escuchando en puerto 8080'))
