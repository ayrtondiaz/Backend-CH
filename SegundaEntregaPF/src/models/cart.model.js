import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    timespamp: {
        type: Date,
        max: 100
    },
    products: [
        new Schema({
            timestamp: Date,
            nombre: String,
            codigo: String,
            precio: Number,
            stock: Number
        })
    ]
})

export default model(cart, cartSchema)