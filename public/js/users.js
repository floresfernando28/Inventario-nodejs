

// Función para obtener datos de las tablas y actualizarlos en un modal
const modalEditarUser = new bootstrap.Modal(document.getElementById('modalEditarUser'))
const on = (element, event, selector , handler) =>{
    element.addEventListener(event, e=>{
      if(e.target.closest(selector)){
        handler(e)
      }
    })
};

on(document, 'click', '.editarUser', e=>{
    let fila = e.target.parentNode.parentNode;
    id.value = fila.children[0].innerHTML
    nombre.value = fila.children[1].innerHTML
    apellido.value = fila.children[2].innerHTML
    edadd.value = fila.children[3].innerHTML
    fecha.value = fila.children[4].innerHTML
    user.value = fila.children[5].innerHTML
    modalEditarUser.show();

});



const newUsers = document.getElementById('newUsers').addEventListener('click', (e)=>{
  let nombre = document.getElementById('nombres').value;
  let apellido = document.getElementById('apellidos').value;
  let edad = document.getElementById('edad').value;
  let date = document.getElementById('date').value;
  let usuario = document.getElementById('usuario').value;
  let pass = document.getElementById('pass').value;
  let pass2 = document.getElementById('pass2').value;
  
  if((nombre == '') || (apellido == '') || (edad == '') || (date == '') || (usuario == '') || (pass == '') || (pass2 == '')){
    e.preventDefault();
    alerta2('¡Asegurate de rellenar todos los campos!', 'Algunos campos del formularios estan vacios', 'info');
  }else if (edad <= 15 || edad > 85){
    e.preventDefault();
    alerta2('¡La edad debe ser Mayor a 15 Años!', 'El Campo edad debe ser compleatdo', 'warning');
  }else if(pass != pass2){
    e.preventDefault();
    alerta2('¡Verifica tu contraseña, porque no son iguales!', 'El Campo contraseña debe ser compleatdo', 'warning');
  }

});


const update = document.getElementById('update').addEventListener('submit', (e)=>{
  // alert('hola')
  let non = document.getElementById('nombre').value
  if(non == ''){
    e.preventDefault();
    alert('vacio')
  }
})
