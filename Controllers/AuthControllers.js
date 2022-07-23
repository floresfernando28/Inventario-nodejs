// Importamos la conexión ala BD ===>
const conexion = require('../Databases/ConexionDB');

// Controladores donde se haran todas las ejecuciones
const controller = {};

// Mostramos todos los usuarios del sistema y mostramos en el select -> los roles
controller.mostrarUsuarios = (req , res)=>{
   try{
      query = `select usuarios.*, rol.NombreRol
      from usuarios inner join rol
      on usuarios.idRol = rol.id`;

      conexion.query(query,('SELECT * FROM rol'), (error, usuarios)=>{
         if(error){
            console.log('Error en la consulta: '+error);
            return
         }
         conexion.query('SELECT * FROM rol', (error, roles)=>{
            if(error){
               console.log('Error al consultar los roles de los usuarios: '+error)
               return
            }
            res.render('users',{user:usuarios, rol:roles})
         })
      })
   }catch(error){
      console.log('Error al traer los datos de los usuarios: '+error);
   }
};

// Ingresamos usuarios en el sistema 
controller.IngresarUsuarios = (req, res)=>{
   let nombres = req.body.nombres;
   let apellidos = req.body.apellidos;
   let edad = req.body.edad;
   let date = req.body.date;
   let usuario = req.body.usuario;
   let rol = req.body.rol;
   let pass = req.body.pass;

   try{
      conexion.query('INSERT INTO usuarios SET ?', {Nombres:nombres, Apellidos:apellidos, Edad:edad, FechaNacimiento:date, NombreUsuario:usuario, IdRol:rol, Contrasenia:pass}, (error, agregado)=>{
         if(error){
            console.log('Ha ocurrido un error al registrar nuevos usuarios al sistema:'+error)
            return
         }
         console.log('¡Usuario Registrado Correctamente!')
         res.redirect('/users')
      })

   }catch(error){
      console.log('Ha ocurrido un error en el controlador de ingresar usuario: '+error);
   }
}
// Eliminamos usuarios del sistema
controller.eliminarUsuario = (req, res)=>{
   let id = req.params.id;
   try{
      conexion.query('DELETE FROM usuarios WHERE Id = ?', [id], (error, results)=>{
         if(error){
            console.log('Ha ocurrido un error al eliminar usuarios: '+error)
            return
         }
         console.log('¡Usuario Eliminado Correctamente!')
         res.redirect('/users');
      })

   }catch(error){
      console.log('Ha ocurrido un error en el controlador eliminarUsuario: '+error);
   }
}




module.exports = controller;