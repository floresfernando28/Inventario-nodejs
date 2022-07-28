const formulario2 = document.getElementById('pases');

formulario2.addEventListener('submit',(e)=>{
    const pass3 = document.getElementById('pass3').value;
    const pass2 = document.getElementById('pass2').value;
    const pass1 = document.getElementById('pass1').value;

    if(pass1 == '' || pass2 == '' || pass3 == ''){
        e.preventDefault();
        alerta2('¡Completa los campos por favor!', 'Debes rellener todos los cambos con datos validos', 'info')
    }else if(pass2 != pass3){
        e.preventDefault();
        alerta2('¡La nueva contraseña no es igual ala que ingreso !', 'Debes rellener todos los cambos con datos validos', 'warning')
    }


})

