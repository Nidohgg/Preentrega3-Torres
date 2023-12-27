console.log("Conectado");


//Funcion para validar que el usuario ingrese solo letras en el formulario
function validarNombre(){

    const nombreCompleto = document.getElementById("nombreCompleto").value;

    //variable para permitir solo letras y espacios
    let regex = /^[a-zA-Z\s]+$/;

    //Se verifica si el nombre cumple con la variable regex
    if(!regex.test(nombreCompleto)){
        alert("Por favor, ingrese su nombre correctamente. No se permiten numeros u/o otros caracteres ");
        return false; //Se evita que se envie el formulario si la validacion falla
    }

    //El formulario solo se enviara si la validacion es exitosa
    return true;
}
