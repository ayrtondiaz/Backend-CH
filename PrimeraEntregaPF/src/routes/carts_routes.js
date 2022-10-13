const express = require('express');
const {Router} = express;
const app = express();
const routerCart= Router();

const admin = require('../utils/admin');
const CartsContainer = require('../controllers/carts_container.js');
const carts = new CartsContainer('../filesContainer/carts.json');

const ProductsContainer = require('../controllers/products_container');
const product = new ProductsContainer('../filesContainer/products.json');

routerCart.post('/',admin, async ( req, res)=> {
    if (  req.admin === "true" ||  req.admin === "false") {
        const result = await carts.saveCart();
        res.status(200).json(result);
    }
});

routerCart.delete('/:id',admin, async (req, res) => {
    const {id} = req.params;
    if (  req.admin === "true" ||  req.admin === "false") {
        if (!isNaN(id)) {
            const result = await carts.deleteCartById(parseInt(id));
            return res.status(200).json(result);
        }
        return res.status(400).json({error: 'error al pasar el parametro'});
    }
});

routerCart.get('/:id/products',admin, async (req, res) => {
    const {id} = req.params;
    if (  req.admin === "true" || req.admin === "false") {
        if (!isNaN(id) ) {
            const result = await carts.getAllProductsCart(parseInt(id));
            return res.status(200).json(result);
        } 
        return res.status(400).json({error: 'error al pasar el parametro'});
    }
});

routerCart.post('/:id/products',admin, async (req, res) => {
    const {id} = req.params;
    const productId = req.body.productId;
    if (  req.admin === "true" || req.admin === "false") {
        const getProduct = await product.getById(parseInt(productId));
        if (Object.entries(getProduct).length === 1) {
            return res.status(200).json(getProduct); 
        } 
        const resultIsProductExist = await carts.isProductExistInCart(parseInt(id), parseInt(productId));
        if (resultIsProductExist ) {
            return res.status(200).json({producto: "Este producto ya existe en el carrito"}); 
        } else {
            const result = await carts.saveProductInCart(parseInt(id), getProduct);
            return res.status(200).json(result);
        }
    }  
});

routerCart.delete('/:id/products/:idProd',admin, async (req, res) => {
    const {id, idProd} = req.params;
    if (  req.admin === "true" || req.admin === "false") {
        if (!isNaN(id) && !isNaN(idProd)) {
            const result = await carts.deleteProductCartById(parseInt(id), parseInt(idProd));
            return res.status(200).json(result);
        }
        return res.status(400).json({error: 'error al pasar el parametro'});
    }
});
module.exports = routerCart;
