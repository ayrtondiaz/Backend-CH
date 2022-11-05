import Container from "../../containers/containerMongoDb.js";
import productModel from "../../models/products.model.js"

class ProductsContainer extends Container {
    constructor(model) {
        super(model)
    }

    async save(data) {
        try {
            const product = new this.model(data)
            const newProduct = await newUser.save(product)

            return newProduct.id
        } catch (error) {
            console.log(error);
        }
    }

    async change(id, data) {
        try {
            await product.updateOne({ _id: id }, { $set: data})

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const products = await this.model.find()

            return products
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const products = await this.model.findById(id)

            return products
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await this.model.delete({ _id: id })
        } catch (error) {
            console.log(error);
        }
    }
}

const productsContainer = new ProductsContainer(productModel);

export default productsContainer
