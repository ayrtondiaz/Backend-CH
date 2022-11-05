import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    timestamp: {
        type: Date,
        max: 100,
        required: true
    },
    nombre: {
        type: String,
        max: 100,
        required: true
    },
    codigo:{
        type: String,
        max: 100,
        unique: true,
        required: true
    },
    precio: {
        type: Number,
        max: 100,
        required: true
    },
    stock:{
        type: Number,
        max: 100,
        required: true
    }
})

export default model(products, productsSchema)