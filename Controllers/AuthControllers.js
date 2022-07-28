// Importamos la conexión ala BD ===>
const conexion = require('../Databases/ConexionDB');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

// Controladores donde se haran todas las ejecuciones
const controller = {};

controller.isAuthenticated = async (req, res, next)=>{
   if(req.cookies.jwt){
      try{
         let consul = `select usuarios.*, rol.NombreRol
                        from usuarios inner join rol
                        on usuarios.idRol = rol.id where usuarios.id = ?`;

          const decodificado = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
          conexion.query(consul, [decodificado.id], (error, results)=>{
              if(error){
                  console.log(error)
                  return 
              }
              if(!results){return next()}
              req.NombreUsuario = results[0]
              return next()
          })
      }catch(error){
          console.log('Ha ocurrido un error en el controlador isAutehnticated '+error)
          return next()
      }
  }else{
      res.redirect('/login')
  }
}

// Loguearse
controller.loguearse = async (req, res)=>{
   let user = req.body.user;
   let pass = req.body.pass;
   try{
      let consulta = 'SELECT * FROM usuarios WHERE NombreUsuario = ?';
      conexion.query(consulta, [user], async (error, usuario)=>{
         if(error){
            console.log('Ha ocurrido un error al loguear usuarios: '+error);
            return
         } 

         if((usuario.length == 0) || !(await bcryptjs.compare(pass, usuario[0].Contrasenia))){
            res.render('login',{
               alerta: true,
               titulo: '¡El Usuario no existe!',
               texto: 'Por favor ingresa los datos correctos',
               icono: 'error',
               boton: true,
               ruta: 'login'
            })
         }else{
            // Configuramos el token
            let id = usuario[0].Id;
            const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
               expiresIn: process.env.JWT_EXPIRACION
            })

            // Configuramos la cookie
            const OpcionesCookies = ({
               expires: new Date(Date.now()+process.env.COOKIE_EXPIRACION * 24 * 60 * 60 * 100),
               httpOnly: true
            })

            res.cookie('jwt', token, OpcionesCookies);

            res.render('login',{
               alerta: true,
               titulo: '¡Accedido Correctamente!',
               texto: '¡Hola '+usuario[0].Nombres+' !',
               icono: 'success',
               boton: true,
               ruta: '/'
            })
         }
      })
   }catch(error){
      console.log('Ha ocurrido un error en el controlador loguearse: '+error);
   }
   
}

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
controller.IngresarUsuarios = async (req, res)=>{
   let nombres = req.body.nombres;
   let apellidos = req.body.apellidos;
   let edad = req.body.edad;
   let date = req.body.date;
   let usuario = req.body.usuario;
   let rol = req.body.rol;
   let pass = req.body.pass;

   const passHash = await bcryptjs.hash(pass, 8);

   try{
      conexion.query('INSERT INTO usuarios SET ?', {Nombres:nombres, Apellidos:apellidos, Edad:edad, FechaNacimiento:date, NombreUsuario:usuario, IdRol:rol, Contrasenia:passHash}, (error, agregado)=>{
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

// Actualizar usuarios del sistema
controller.updateUsers = (req, res)=>{
   let id = req.body.id;
   let nombre = req.body.nombre;
   let apellido = req.body.apellido;
   let edad = req.body.edadd;
   let fecha = req.body.fecha;
   let user = req.body.user;
   let rol = req.body.roll;

   try{
      conexion.query('UPDATE usuarios SET ? WHERE Id = ?', [{Nombres:nombre, Apellidos:apellido, Edad:edad,FechaNacimiento:fecha,NombreUsuario:user,IdRol:rol},[id]]
      , (error, results)=>{
         if(error){
            console.log('Hay un error al actualizar los usuarios: '+error)
            return
         }
         console.log('¡Datos Actualizados Correctamente!')
         res.redirect('/users');
      })


   }catch(error){
      console.log('Ha ocurrido un error en el controlador updateUsers: '+error);
   }
}

// Controlador para autenticar usuarios en el sistema

// Eliminar la cookie
controller.eliminarCookie = (req, res)=>{
   res.clearCookie('jwt');
   return res.redirect('/')
}

// Controlador para borrar el cache del navegador
controller.nocahe = (req, res,next)=>{
      if(!req.user)
          res.header('Cache-Control','private, no-cache, no-store, must-revalidate');
      next();
}

// Cambiar contraseña del usuario logueado
controller.cambiarContrasenia = (req, res)=>{
   let id = req.body.id;
   let pass1 = req.body.pass1;
   let pass2 = req.body.pass2;
   let pass3 = req.body.pass3;
   

   try{
      conexion.query('SELECT * FROM usuarios WHERE Id = ?', [id], async (error, datos)=>{
         if(error){
            console.log('Ha ocurrido un error al cambiar la contraseña: '+error)
            return 
         }
         let passHash = datos[0].Contrasenia;
         if(!(await bcryptjs.compare(pass1, passHash))){
            res.redirect('/cambiarPassword')
         }else{
            const passEncriptada = await bcryptjs.hash(pass2, 8);
            conexion.query('UPDATE usuarios SET ? WHERE Id = ?', [{Contrasenia:passEncriptada},id], (error, results)=>{
               if(error){
                  console.log('Ha ocurrido un error al cambiar la contraseña: '+error)
                  return 
               }
               console.log('¡Se ha modificado su contraseña correctamente!')
               res.redirect('/cambiarPassword')
            })
         }
      })

   }catch(error){
      console.log('Ha ocurrido un error en el controlador cambiarContrasenia: '+error);
   }
}




controller.mostrarUsuarios2 = (req , res)=>{
   try{

      conexion.query('SELECT * FROM rol', (error, usuarios)=>{
         if(error){
            console.log('Error en la consulta: '+error);
            return
         }
         console.log(usuarios)
         res.render('index', {us:usuarios})
      })
   }catch(error){
      console.log('Error al traer los datos de los usuarios: '+error);
   }
};



module.exports = controller;