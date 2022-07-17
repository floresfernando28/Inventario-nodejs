// Inovamos a express
const express = require('express');
const app = express();
const puerto = 3000;

// Configuraciones para traer datos de los inputs del HTML
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Configuramos el acceso ala carpeta public
app.use(express.static('public'));

// Añadimos las variables de entorno
const dotenv = require('dotenv');
dotenv.config({path: './Env/.env'});

// Añadimos el motor de plantillas de JS -> EJS
app.set('view engine', 'ejs');

// Configuramos los enrutadores desde el modelo Routers
const routers = require('./Routers/routers');
app.use('/',routers);


// Iniciamos el servidor de node
app.listen(puerto,()=>{
    console.log('Servidor en ejecición desde http://localhost:3000')
});