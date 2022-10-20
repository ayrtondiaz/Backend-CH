const express = require('express');
const Container = require('../container/productContainer');
const productos = new Container(options.mysql,"productos");
const { Router } = express;

const router = Router();


// router.get('', (req, res) => {
//     res.render('pages/products');
// });

router.get("/", async (req, res) => {
    const products = await productos.getAll()
    let productExists = false
    await products ? productExists = true : productExists = false
    
    res.render( 'main', {products, productExists})
    // res.json( {products})
})
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const productDetail = productos.getById(id)
    res.json(await productDetail)
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const productData = req.body
    res.json(await productos.editById(id, productData))
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    res.json(await productos.deleteById({'id': id}))
})

router.post('/productos',async (req, res) => {
    const product = req.body;
    res.json(await productos.addProduct(product))
});

module.exports = router;