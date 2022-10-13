const fs = require('fs');

class CartsContainer {
    
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
        return Date.now();
    }

    async saveCart() {
        try {
            const cartsContent = await this.#readFile();
            const timestamp = this.#getTimestamp();
            let id = 1;
        if (cartsContent.length !== 0) {
            id += cartsContent[cartsContent.length-1].id;
            fs.promises.writeFile(this.filePath, JSON.stringify([...cartsContent, { id, timestamp, products:[]}], null, 2), 'utf-8');
            return {id};
        }
            fs.promises.writeFile(this.filePath, JSON.stringify([...cartsContent, { id, timestamp, products:[]}], null, 2), 'utf-8'); 
            return {id};
        } catch (error) {
            console.log(error);
        }
        
    }

    async isProductExistInCart(idCart, productId) {
        const cartsContent = await this.#readFile();
        const cartContent = cartsContent.find(({id}) => id === idCart );
        if(!cartContent) {
            return false;
        }
        return  cartContent.products.some( ({id})=> id === productId);
    }  
    
    async saveProductInCart(idCart, product) {
        try {
            const cartsContent = await this.#readFile();
            const cartContent = cartsContent.find(({id}) => id === idCart );
            if (!cartContent) {
                return {msg:"Carrito no existe"};
            }
            cartContent.products.push({...product});
            fs.promises.writeFile(this.filePath, JSON.stringify([...cartsContent], null, 2), 'utf-8');
            
            return {msg:"Producto guardado en el carrito"};
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCartById(idCart) {
        try {
            const cartsContent = await this.#readFile();
            const newCartsContent = cartsContent.filter(({id}) => id !== idCart );
            if(cartsContent.length === newCartsContent.length) {
                return {msg: "Este carrito no existe"};
            }
            fs.promises.writeFile(this.filePath, JSON.stringify([...newCartsContent], null, 2), 'utf-8');
            return {msg: " Se eliminó este carrito"};
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProductsCart(idCart) {
        try {
            const cartsContent = await this.#readFile();
            const cartContent = cartsContent.find(({id}) => id === idCart );
            if (!cartContent) {
                return {msg:"Carrito no existe"};
            }
            return {Productos: cartContent.products};
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductCartById(idCart, idProduct) {
        try {
            const cartsContent = await this.#readFile();
            const cartContentIndex = cartsContent.findIndex(({id}) => id === idCart );
            if(cartContentIndex === -1) {
                return {msg:"Carrito no existe"};
            }
            const newProductsInCart = cartsContent[cartContentIndex].products.filter(({id}) => id !== idProduct );
            if(cartsContent[cartContentIndex].products.length === newProductsInCart.length) {
                return {msg: "Este producto no existe en el carrito mencionado"};
            }
            cartsContent[cartContentIndex].products = [...newProductsInCart];
            fs.promises.writeFile(this.filePath, JSON.stringify([...cartsContent], null, 2), 'utf-8');
            return  {msg:"Producto eliminado"};

        } catch (error) {
            console.log(error)
        }
    }
  
}

module.exports = CartsContainer;
