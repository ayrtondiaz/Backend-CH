const dbMongo = require('./dbMongo.js')
const productosFile = require('./productosFile.js')
const productosMem = require('./productosMem.js')

const rutaProductos = './productos.txt'
const conexion = 'mongodb+srv://ayrton:123@cluster0.o9zelxa.mongodb.net/ecommerce?retryWrites=true&w=majority'

let dao

switch (opcion) {
    case 'Mongo': 
        dao = new dbMongo(conexion)
        await dao.init()
        break
    case 'File':
        dao = new productosFile(rutaProductos)
        await dao.init()
        break
    default:
        dao = new productosMem
}

class Factory {
    static getDAO(){ return dao }
}

module.exports = Factory