import Container from "../../containers/containerFirebase.cjs";

class ProductsContainer extends Container {
    constructor(collecion) {
        super(collecion)
    }

    async save(data) {
        try {
            const products = await this.getAll()

            if (products.length !== 0) {
                this.lastId = products.length + 1
            }

            const doc = this.query.doc(`${this.lastId}`);
            await doc.create(data);

            return this.lastId
        } catch (error) {
            console.log(error);
        }
    }

    async change(id, data) {
        try {
            const doc = this.query.doc(`${id}`);
            await doc.update(data)

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const queryProducts = await this.query.get();

            const res = queryProducts.docs.map(documentos => ({ id: documentos.id, ...documentos.data() }));

            return res
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const queryProducts = this.query.doc(`${id}`);
            const product = await queryProducts.get();
            const res = { id: product.id, ...product.data() };

            return res

        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(`${id}`);
            await doc.delete()

        } catch (error) {
            console.log(error);
        }
    }
}

const productsContainer = new ProductsContainer('products');

export default productsContainer
