import { Router } from "express";
import getPath from "../middlewares/getPath.js";

const router = Router();


router.get('/:id/productos', getPath, async (req, res) => {
    const path = res.locals.path

    const {default: cartContainer} = await import(`../dao/${path}/cartContainer${path}.js`);

    const { id } = req.params;
    const products = await cartContainer.getAllItems(id);

    res.status(202).json(products);
});

router.post('/', getPath, async (req, res) => {
    const path = res.locals.path

    const {default: cartContainer} = await import(`../dao/${path}/cartContainer${path}.js`);

    const id = await cartContainer.create();

    res.status(201).json(id);
});

router.post('/:id/productos', getPath, async (req, res) => {
    const path = res.locals.path

    const {default: cartContainer} = await import(`../dao/${path}/cartContainer${path}.js`);

    const { id } = req.params;
    const { prodId } = req.body
    await cartContainer.saveItem(id, prodId);

    res.sendStatus(201);
});

router.delete('/:id', getPath, async (req, res) => {
    const path = res.locals.path

    const {default: cartContainer} = await import(`../dao/${path}/cartContainer${path}.js`);

    const { id } = req.params;
    const deleteCart = await cartContainer.deleteById(id);
    if (deleteCart === false) {
        res.sendStatus(400);
        return
    }

    res.sendStatus(202);
});

router.delete('/:id/productos/:id_prod', getPath, async (req, res) => {
    const path = res.locals.path

    const {default: cartContainer} = await import(`../dao/${path}/cartContainer${path}.js`);

    const { id, id_prod } = req.params;
    const deleteItem = await cartContainer.deleteItem(id, id_prod);

    if (deleteItem === false) {
        res.sendStatus(400);
        return
    }

    res.sendStatus(202);
});

export default router