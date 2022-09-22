const express = require('express')
const app = express()
const Contenedor = require('./Contenedor')
const PORT = 8080

const products = new Contenedor('./products.txt')

app.get('/productos', (req, res) => {
   return res.json(products.getAll())

})
app.get('/productosRandom', (req, res) => {
    return res.json(products.getRandom())  
  })

app.get('/', (req, res) => {
  return res.send('Hola Desafio')
})

app.listen(PORT, () => console.log('El servidor esta escuchando en puerto 8080'))
