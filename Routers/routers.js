// Enrutadores de las vistas hacia el controlador
const express = require('express');
const router = express.Router();

// Importamos los controladores
const AuthControllers = require('../Controllers/AuthControllers');

router.get('/', (req, res)=>{
    res.render('index');
})




module.exports = router;