const fs = require('fs')

class ProductsContainer {
    constructor( filePath ) {
        this.filePath = filePath;
    }

    async #readFile() {
        try {
            const fileContent = await fs.promises.readFile(this.filePath, 'utf-8')
            const parsedContent = JSON.parse(fileContent)
            return parsedContent
        } catch (error) {
            console.log(error)
        } 
    }

    #getTimestamp() {
        return Date.now()
    }

    async save(product) {
        try {
            const productsContent = await this.#readFile();
            const timestamp = this.#getTimestamp();
            let id = 1;
            if (productsContent.length !== 0) {
                id += productsContent[productsContent.length-1].id;
                fs.promises.writeFile(this.filePath, JSON.stringify([...productsContent, {...product, timestamp, id}], null, 2), 'utf-8')
                return {msg:"Producto guardado"};
            }
            fs.promises.writeFile(this.filePath, JSON.stringify([...productsContent, {...product, timestamp, id}], null, 2), 'utf-8')
            return  {msg:"Producto guardado"};
        } catch (error) {
            console.log(error);
        }
        
    }
    
    async getById(idProduct) {
        try {
            const productsContent  = await this.#readFile();
            const productContent = productsContent.find( ({id}) => id === parseInt(idProduct));
            if ( !productContent ) {
                return {msg: 'Producto no existe'};
            }
            return productContent;

        } catch (error) {
            console.log(error)
        }
    }

    async deleteById( idProduct ) { 
        try {
            const productsContent = await this.#readFile();
            const newProductsContent = productsContent.filter(({id}) => id !== parseInt(idProduct));
            if (productsContent.length === newProductsContent.length) {
                return {msg: "Producto no existe!"}; 
            }  
            fs.promises.writeFile(this.filePath, JSON.stringify(newProductsContent, null, 2));
            return {msg: "Producto eliminado"};
            
        } catch (error) {
            console.log(error);
        }
    }

    async update(idProduct, parameterProduct) {
        try {
            const productsContent = await this.#readFile();
            const productContent = productsContent.find( ({id}) => id === parseInt(idProduct));
            if (!productContent) {
                return {msg:"producto no existe"};
            }
            productContent.code = parameterProduct.code;
            productContent.productName = parameterProduct.productName;
            productContent.description = parameterProduct.description;
            productContent.price = parameterProduct.price;
            productContent.stock = parameterProduct.stock;
            productContent.url = parameterProduct.url;
            fs.promises.writeFile(this.filePath, JSON.stringify([...productsContent], null, 2), 'utf-8');
            return {msg: "Producto actualizado"};
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() { 
        try {
            const productsContent = await this.#readFile();
            if (!productsContent.length) {
                return {msg:"No hay producto disponible"};
            }
            return productsContent;    
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = ProductsContainer;
