import { Router } from "express";
import isAdmin from "../middlewares/IsAdmin.js";
import getPath from "../middlewares/getPath.js";

const router = Router();

router.get('/:id?', getPath, async (req, res) => {
    const path = res.locals.path

    const {default: productsContainer} = await import(`../dao/${path}/productsContainer${path}.js`);

    const { id } = req.params;

    if (typeof (id) === "string") {
        const product = await productsContainer.getById(id);

        if (product === false) { // error if product doesn't exist
            res.sendStatus(400);
            return
        }

        res.status(302).json(product);
        return
    }

    res.json(await productsContainer.getAll());
});

router.post('/', isAdmin, getPath, async (req, res) => {
    const path = res.locals.path

    const {default: productsContainer} = await import(`../dao/${path}/productsContainer${path}.js`);

    await productsContainer.save(req.body);

    res.sendStatus(201);
});

router.put('/:id', isAdmin, getPath, async (req, res) => {
    const path = res.locals.path

    const {default: productsContainer} = await import(`../dao/${path}/productsContainer${path}.js`);

    const { id } = req.params;
    const changeProduct = await productsContainer.change(id, req.body);

    if (changeProduct === false) {
        res.sendStatus(400);
        return
    }
    
    res.sendStatus(202);
});

router.delete('/:id', isAdmin, getPath, async (req, res) => {
    const path = res.locals.path

    const {default: productsContainer} = await import(`../dao/${path}/productsContainer${path}.js`);

    const { id } = req.params;
    const deleteProduct = await productsContainer.deleteById(id);
    if (deleteProduct === false) {
        res.sendStatus(400);
        return
    }

    res.sendStatus(202);
});

export default router