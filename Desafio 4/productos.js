const Container = require('./constructor.js');
const express= require('express');
const {Router} = express;

const router= new Router();

const contenedor = new Container('./products.json')

router.get('/',(req,res)=>{
    res.json(contenedor.getAll());
})

router.get('/:id',(req,res)=>{
    let {id}=req.params;
    id= parseInt(id);
    const producto = contenedor.getById(id)
    if(producto)
    {
        res.json(producto)
    }
    else res.send({error : 'producto no encontrado'}) 
})

router.post('/',(req,res)=>{
  const product = req.body;
  contenedor.save(product);
  res.status(201).send({ status: "Guardado" });
})

router.put('/:id',(req,res)=>{
    let {id}=req.params;
    id= parseInt(id);
    const producto = contenedor.getById(id)
    if (producto){
        let contendidoProducto=req.body
        contenedor.modifyById(id,contendidoProducto)
        res.status(201).send({ status: "Actualizado" });
    }
    else res.send({error : 'producto no encontrado'}) 
  })

  router.delete('/:id',(req,res)=>{
    let {id}=req.params;
    id= parseInt(id);
    contenedor.deleteById(id);
    res.status(201).send({ status: "Eliminado" });
  })





module.exports= router;

