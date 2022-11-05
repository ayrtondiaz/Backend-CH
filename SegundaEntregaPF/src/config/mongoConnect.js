import mongoose from "mongoose"

export default function connect() {
    try {
       
        const URL = 'mongodb://localhost:27017/ecommerce'           
        mongoose.connect(URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        
    } catch (error) {
        console.log(error)
    }
}
