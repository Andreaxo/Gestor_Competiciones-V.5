const express = require('express');
const response = require('../../network/responses');
const router = express.Router();
const controller = require('./controller');

router.post('/', async function (req, res, next){
    console.log("BODY RECIBIDO:", req.body); 
    try{
        const items = await controller.sendForm( req.body );
        if(req.body.id == 0){
            mensaje = 'Item guardado con éxito';
        } else{
            mensaje = 'Item actualizado con éxito';
        }
        response.success(req, res, items, 201);
    } catch(err){
        next(err);
    }
});

router.get('/', async function (req, res, next){
    try{
        const items = await controller.getForm();
        response.success(req, res, items, 200);
    } catch(err){
        next(err);
    }
});

router.get('/:id', async function (req, res, next){
    try{
        const items = await controller.getFormById(req.params.id);
        response.success(req, res, items, 200);
    } catch(err){
        next(err);
    }
});

router.delete('/:id', async function (req, res, next){
    try{
        const items = await controller.deleteForm({ id: req.params.id });
        response.success(req, res, 'Item eliminado satisfactoriamente', 200);
    } catch(err){
        next(err);
    }
});

module.exports = router;