const express = require('express');
const { Router } = express;
const app = express();
const router = Router();
const admin = require('../utils/admin');
const ProductsContainer = require('../controllers/products_container');
const products = new ProductsContainer('../filesContainer/products.json');


router.get('/', admin,  (req, res) => {
     if (  req.admin === "true" ||  req.admin === "false") {
        const result =  products.getAll();
        return res.status(200).json(result);
     }
});

router.get('/:id', admin, async (req, res) => {
    const {id} = req.params;
    if (  req.admin === "true" ||  req.admin === "false") {
        if (id) {
            if (!isNaN(id) ) {
                const result = await products.getById(parseInt(id));
                return res.status(200).json(result);
            } 
        } 
        return res.status(400).json({error: 'error al pasar el parametro'}); 
    } 
} );

router.post('/', admin, async (req, res) => {
    if (  req.admin === "true") {
        const {code, productName, description, price, stock, url} = req.body;
        if (code && productName && description && price && stock && url) {
            const result = await products.save({code, productName, description, price, stock, url});
            return res.status(200).json(result);    
        } 
        return res.status(400).json({error: 'error al pasar parametros'});
    } else {
        return res.status(400).json({error: 'error No tiene acceso a este recurso'}); 
    }
});


router.put('/:id', admin, async (req, res) => {
    if (  req.admin === "true") {
        const {id} = req.params;
        const {code, productName, description, price, stock, url} = req.body;
        if (code && productName && description && price && stock && url && !isNaN(id)) {
            const result = await products.update(parseInt(id), {code, productName, description, price, stock, url});
            return res.status(200).json(result); 
        } 
        return res.status(400).json({error: 'error al pasar los parametros'});
    } else{
        return res.status(400).json({error: 'error No tiene acceso a este recurso'}); 
    }
});

router.delete('/:id', admin, async (req, res) => {
    const {id} = req.params;
    if (  req.admin === "true") {
        if (!isNaN(id)) {
            const result = await products.deleteById(parseInt(id));
            return res.status(200).json(result);
        }
        return res.status(400).json({error: 'error al pasar el parametro'});
    } else {
        return res.status(400).json({error: 'error No tiene acceso a este recurso'}); 
    }
})

module.exports = router;
