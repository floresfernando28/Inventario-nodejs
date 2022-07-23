// Enrutadores de las vistas hacia el controlador
const express = require('express');
const router = express.Router();

// Importamos los controladores
const AuthControllers = require('../Controllers/AuthControllers');


// Rutas para las vistas
router.get('/', (req, res)=>{
    res.render('index');
})

router.get('/login', (req, res)=>{
    res.render('login');
})

router.get('/register', (req, res)=>{
    res.render('register');
})

router.get('/infoPersonal', (req, res)=>{
    res.render('infoPersonal');
})

router.get('/users',AuthControllers.mostrarUsuarios, (req, res)=>{
    res.render('users');
})




// Rutas para los datos de los formularios

router.post('/ingresarUsuarios', AuthControllers.IngresarUsuarios);
router.get('/eliminarUsuario/:id', AuthControllers.eliminarUsuario);



module.exports = router;