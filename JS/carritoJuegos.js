console.log("Conectado");

//array donde se guardaran los productos seleccionados
let carrito = [];

//Si se agrego al menos 1 elemento al carrito el la pagina informa que se puede ir a pagar
if(carrito.length >= 1){
    alert("Ir a pagar");
}else{
    console.log("Usuario prefiere seguir viendo productos.");
}

function agregarAlCarrito(nombre, precio){

    //Agregar el producto al array del carrito
    carrito.push({ nombre, precio });

    //Actualiza lña lsita del modal
    actualizarListaCarrito();

    //Muestra el modal
    mostrarModal();
}

function mostrarModal(){

    const modalElement = document.getElementById('carritoModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

}

function actualizarListaCarrito(){
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ""; //Se limpia la lista actual del carrito

    //Agrega cada producto del carrito a la lista 
    carrito.map( (videojuego, index) => {

        const item = document.createElement('li'); //Se crea el elemento LI para ir creando la lista de productos

        item.classList.add('list-group-item');

        item.innerHTML = `${videojuego.nombre} - ARS  ${videojuego.precio}  <span class="fas fa-trash-alt float-right" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span>`;

        listaCarrito.appendChild(item);
    })
}

function eliminarDelCarrito(index){
    carrito.splice(index, 1);//Elimina el elemento del array
    actualizarListaCarrito()//Actualiza la lista en el modal;
}

//array de Videojuegos a vender 
const videojuegos = [

    {nombre: "Kirby - Nintendo Switch", precio: 20000, descripcion: "insertar descripcion", img:"../multimedia/JUEGOS/juego3.jpg"},
    {nombre: "Star Wars JEDI Fallen the Fallen Order - PS5", precio: 28000, descripcion: "insertar descripcion", img: "../multimedia/JUEGOS/juego2.jpg"},
    {nombre: "Dead and Cells - Nintendo Switch", precio: 21000, descripcion: "insertar descripcion", img: "../multimedia/JUEGOS/juego4.png"},
    {nombre: "Uncharted 4 - PS4", precio: 19000, descripcion: "insertar descripcion", img: "../multimedia/JUEGOS/juego5.jpg"},
    {nombre: "Uncharted: A lost legacy - PS4", precio: 20000, descripcion: "insertar descripcion", img:"../multimedia/JUEGOS/Juego6.jpg"},
    {nombre: "Far Cry 6 - XBOX ", precio: 23000, descripcion: "insertar descripcion", img:"../multimedia/JUEGOS/Juego7.jpg"},
    {nombre: "CoD Modern Warfare III - PS4", precio: 20000, descripcion: "insertar descripcion", img:"../multimedia/JUEGOS/juego8.jpg"},
    {nombre: "Dragon Ball Sagas - PC", precio: 3000, descripcion: "insertar descripcion", img:"../multimedia/JUEGOS/Juego1.jpg"},
    {nombre: "Sifu PS5", precio: 26000, descripcion: "insertar descripcion",  img:"../multimedia/JUEGOS/Juego9.jpg"},
    {nombre: "Bloodborne PS4", precio: 15000, descripcion: "insertar descripcion", img: "../multimedia/JUEGOS/juego10.jpg"},
    {nombre: "Resident Evil 2 - PS4", precio: 25000, descripcion: "insertar descripcion", img:"../multimedia/JUEGOS/juego11.jpg"},
    {nombre: "Resident Evil Village PS5", precio: 26000, descripcion: "insertar descripcion", img:"../multimedia/JUEGOS/juego12.jpg"},

]


//funcion para revelar los juegos de consolas
function mostrarArticulos(productosFiltrados){
    const contenedor = document.getElementById("contenedorJuegos"); //Se usa el getbyID para acceder al contenedor donde se van a encontrar los juegos/Productos
    contenedor.innerHTML = ""; //se limpia el contenedor *innerHTML se usa para cambiar/agregar las propiedades de HTML desde JS*
    productosFiltrados.map(videojuegos => {//Se utiliza el metodo map para crear un array con los objetos/productos dentro de cards con boostrap
        const divProducto = document.createElement("div");//Se crea el nodo tipo elemento con la etiqueta section

        divProducto.classList.add("card", "m-2");//Se le agregan las clases de Boostrap,(como lo son las cards) desde JS en vez de html
        divProducto.style.width = "11rem";

        divProducto.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${videojuegos.nombre}</h5>
                <img src="${videojuegos.img}" class="card-img-top" alt="${videojuegos.nombre}">
                <p class="card-text">Valor: ${videojuegos.precio}</p>
                <p class="card-tex">${videojuegos.descripcion}</p>
                <button class="btn btn-primary" onclick="agregarAlCarrito('${videojuegos.nombre}', ${videojuegos.precio})">Agregar al carrito</button>
            </div>
        `;

        //Se añade el div de los videojuegos al contenedor(section)
        contenedor.appendChild(divProducto);

    });
}



//Funcion para buscar los objetos basado en lo que escribe el usuario
function busquedaFiltrada() {
    const textoBuscado = document.getElementById("buscarArticulos").value.toLowerCase();
    const productosFiltrados = videojuegos.filter(videojuego =>//se usa el metodo filter para crear un nuevo array con los objetos que coincidan con lo que va ingresando el usuario
        videojuego.nombre.toLowerCase().includes(textoBuscado));//se usa include para saber si lo que se ingreso aparece en el array de viedejuegos
    
        mostrarArticulos(productosFiltrados);
};

//evento para detectar lo que ingresa el usuario
document.getElementById("buscarArticulos").addEventListener("input", busquedaFiltrada);

//muestra los videojuegos que se encuentran en el section
mostrarArticulos(videojuegos);
