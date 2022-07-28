
const formulario1 = document.getElementById('loguearse');

// form #1
formulario1.addEventListener('submit',(e)=>{
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    if((user == '') || (pass == '')){
        e.preventDefault()
        alerta2('¡Completa los campos para acceder!', 'Debes rellener todos los cambos con datos validos', 'info')
    }
})


