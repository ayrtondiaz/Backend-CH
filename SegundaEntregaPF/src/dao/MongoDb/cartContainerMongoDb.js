import Container from "../../containers/containerFs.js";
import productsContainer from "./productsContainerMongoDb.js";
import cartModel from "../../models/cart.model.js"
class CartContainer extends Container {
    constructor(model) {
        super(model)
    }

    async create() {
        try {
            const cart = new this.model(data)
            const newCart = await newUser.save(cart)

            return newCart.id
        } catch (error) {
            console.log(error);
        }
    }

    async saveItem(id, prodId) {
        try {
            const product = await productsContainer.getById(prodId)


        } catch (error) {
            console.log(error);
        }
    }


    async getAllItems(id) {
        try {
            const cart = await this.model.findById(id)

            return cart.products

        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const cart = await this.model.findById(id)

            return cart
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


    async deleteItem(id, prodId) {
        try {
            const cart = await this.model.findById(id)

            cart.products.id(prodId).remove()

            await cart.save()
        } catch (error) {
            console.log(error);
        }
    }
}

const cartContainer = new CartContainer(cartModel);

export default cartContainer