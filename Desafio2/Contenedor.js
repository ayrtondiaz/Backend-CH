
//Diaz Ayrton Sergio - Backend- Desafio 2
const fs = require('fs')


class Contenedor {
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo
        try {
            this.products = fs.readFileSync(this.rutaArchivo, 'utf-8')
            this.products = JSON.parse(this.products)
          } catch (error) {
            this.products = []
          }
    }
    getAll(){
        return this.products
      }

    #leerUnArchivo(){
        try {
            const contenido =  fs.readFileSync(this.rutaArchivo, 'utf-8')
            const contenidoParseado = JSON.parse(contenido)
            // console.log(contenidoParseado)
            return contenidoParseado
        } catch (error) {
            console.log(error)
        }
        
    }
    //[0,1,2,3,9,10] // length = 6  pos ultimo = length - 1
    async save(obj){ // guarda un objeto en el archivo, devuelve el id asignado
        const contenidoArchivo =  await this.#leerUnArchivo()
        if (contenidoArchivo.length !== 0) {
            console.log(contenidoArchivo)
            await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2), 'utf-8')
        } else {            
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify( [ {...obj, id: 1} ]), 'utf-8')
        }

    }

     getById(id){ // busca por id y devuelve el objeto encontrado        
        let nuevoarray=[]
        nuevoarray = this.products.find((producto) => producto.id === id)
        return nuevoarray
    }

  

    async deleteById(id){
        let nuevoarray= []
        nuevoarray= this.products.filter((producto) => producto.id != id) 
       try{

           await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...nuevoarray], null, 2), 'utf-8')
           console.log("BORRADO")
        }
        catch(err)
        {
            console.log(err)
        }       
    }

    async deleteAll(){
        try{
            await fs.promises.unlink(this.rutaArchivo);
            console.log("Eliminacion Completa")            
        }
        catch(err)
        {
            console.log(err)
        }
        await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([ ]), 'utf-8')
    }

    getRandom(){
        return this.getById(Math.floor(Math.random() * this.products.length) + 1)
      }

}
module.exports=Contenedor

const contenedor = new Contenedor('./products.txt')

//contenedor.save({nombre: 'producto 4', precio: 100})

// contenedor.getAll()

// contenedor.getById(2)


//contenedor.deleteById(4)

//contenedor.getAll()

//contenedor.deleteAll()

// contenedor.getRandom()