// Enrutadores de las vistas hacia el controlador
const express = require('express');
const router = express.Router();

// Importamos los controladores
const AuthControllers = require('../Controllers/AuthControllers');


// Rutas para las vistas
router.get('/',AuthControllers.nocahe, AuthControllers.isAuthenticated,(req, res)=>{
    res.render('index')
})

router.get('/login',(req, res)=>{
    res.render('login',{
        alerta:false
    });
})

router.get('/infoPersonal',AuthControllers.nocahe,AuthControllers.isAuthenticated, (req, res)=>{
    res.render('infoPersonal',{user:req.NombreUsuario});
})

router.get('/users',AuthControllers.nocahe,AuthControllers.isAuthenticated,AuthControllers.mostrarUsuarios, (req, res)=>{
    res.render('users');
})
router.get('/cambiarPassword',AuthControllers.nocahe, AuthControllers.isAuthenticated, (req, res)=>{
    res.render('cambiarPassword',{user:req.NombreUsuario});
})

router.get('/roles', AuthControllers.nocahe, AuthControllers.isAuthenticated, (req, res)=>{
    res.render('roles');
})




// Rutas para los datos de los formularios

router.post('/loguearse', AuthControllers.loguearse);
router.post('/ingresarUsuarios', AuthControllers.IngresarUsuarios);
router.get('/eliminarUsuario/:id', AuthControllers.eliminarUsuario);
router.post('/updateUsers', AuthControllers.updateUsers);
router.get('/eliminarCookie', AuthControllers.eliminarCookie);
router.post('/cambiarContrasenia',AuthControllers.cambiarContrasenia);


module.exports = router;