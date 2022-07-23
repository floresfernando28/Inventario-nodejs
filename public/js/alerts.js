function modalInfoPersonal(){
    const modalInfoPersonal = new bootstrap.Modal(document.getElementById('modalInfoPersonal'));
    modalInfoPersonal.show();

}
function newUser(){
    const newUser = new bootstrap.Modal(document.getElementById('newUser'));
    newUser.show();
}


function alerta (nombre,id,ruta){
    Swal.fire({
        title: '¿Desea eliminar a '+nombre+' ?' ,
        text: 'Se eliminara definitivamente del sistema',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        timer: false
    }).then((results)=>{
        if(results.isConfirmed){
            Swal.fire({
                title: '¡Eliminado Correctamente!',
                text: 'El usuario a sido elimiado',
                icon: 'success',
                showConfirmButton: true,
                timer: false
            }).then(()=>{
                window.location = ruta+'/'+id;
            })
        }
    })
}