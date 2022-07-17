// Importamos MYSQL para trabajar del lado del servidor

const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

conexion.connect((error)=>{
    if(error){
        console.log('Ha ocurrido un error al conectar con la BD: '+process.env.DB_DATABASE);
        return
    }
    console.log('¡Conectado Exitosamente ala BD --> '+process.env.DB_DATABASE+'!');
});


module.exports = conexion;