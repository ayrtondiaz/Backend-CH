import Container from "../../containers/containerFirebase.cjs";
import productsContainer from "./productsContainerFirebase.js";

class CartContainer extends Container {
    constructor(collecion) {
        super(collecion),
        this.timestamp = Date.now()
    }
    
    async create() {
        try {
            const carts = await this.getAll()

            if (carts.length !== 0) {
                this.lastId = carts.length + 1
            }
            

            const doc = this.query.doc(`${this.lastId}`);
            await doc.create({timestamp : this.timestamp});

            return this.lastId
        } catch (error) {
            console.log(error);
        }
    }

    async saveItem(id, prodId) {
        try {
            const product = await productsContainer.getById(prodId)

            const doc = this.query.doc(`${id}`).collection('products').doc(`${product.id}`)

            await doc.add({
                timestamp: product.timestamp,
                nombre: product.nombre,
                codigo: product.codigo,
                precio: product.precio,
                stock: product.stock
            })
        } catch (error) {
            console.log(error);
        }
    }


    async getAllItems(id) {
        try {
            const queryProducts = this.query.doc(`${id}`).collection('products').get()

            const res = queryProducts.doc.map(products => ({ id: products.id, ...products.data() }));

            return res
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const queryCarts = this.query.doc(`${id}`);
            const carts = await queryCarts.get();
            const res = { id: carts.id, ...carts.data() };

            return res
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const queryCarts = this.query.doc(`${id}`);
            await queryCarts.delete();
        } catch (error) {
            console.log(error);
        }
    }


    async deleteItem(id, prodId) {
        try {
            const doc = this.query.doc(`${id}`).collection('products').doc(`${prodId}`);

            await doc.delete();
        } catch (error) {
            console.log(error);
        }
    }
}

const cartContainer = new CartContainer('cart');

export default cartContainer