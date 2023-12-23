
//El carrito inicializa desde LocalStorage, Si no contiene datos, se incializa el carrito como un array vacio
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

carrito.length === 0 && console.log("El carrito se encuentra vacio!");

//Se actualiza la lista del carrito
actualizarListaCarrito();

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


//DESESTRUCTURACION DE OBJECTO VIDEOJUEGOS

const {nombre, precio, descripcion, img} = videojuegos;


function guardarCarritoLocalStorage(){
    //mandar al local
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }


function agregarAlCarrito(nombre, precio){

    //Verificar si el producto ya existe dentro del carrito
    const productoExiste = carrito.find(videojuego => videojuego.nombre === nombre);

    if(productoExiste){
        //Si el producto ya está en el carrito, actualiza la cantidad o realiza la lógica que desees
        productoExiste.cantidad = (productoExiste.cantidad || 1) + 1;
        productoExiste.precio = productoExiste.precio + precio;
    }else{
        //Si el producto no se encuentra en el carrito, hay que agregarlo
        carrito.push({ nombre, precio, cantidad: 1});
    }

    Toastify({
        text: "Producto agregado al carrito.",
        className: "info",
        duration: 2000,
        gravity: "top", 
        position: "center",
        style: {
          background: "linear-gradient(to right, #f58888, #571818)",
        }
      }).showToast();

    //Actualiza la lista del modal
    actualizarListaCarrito();

    guardarCarritoLocalStorage();
}

function mostrarModal(){

    const modalElement = document.getElementById('carritoModal');

    const modal = new bootstrap.Modal(modalElement);//Se crea una nueva instancia de la clase Modal proporcionada por Bootstrap, utilizando el elemento del DOM como parámetro. Esto prepara el modal para ser manipulado programáticamente.

    modal.show();//el metodo show hace que el modal sea visible en la interfaz del usuario, mostrandolo en pantalla

}

function actualizarListaCarrito(){
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = ""; //Se limpia la lista actual del carrito

    //Agrega cada producto del carrito a la lista 
    carrito.map( (videojuego, index) => {

        const item = document.createElement('li'); //Se crea el elemento LI para ir creando la lista de productos

        item.classList.add('list-group-item');

        item.innerHTML = `${videojuego.nombre}<br> Cant: ${videojuego.cantidad}<br> ARS  ${videojuego.precio}  <span class="fas fa-trash-alt float-right" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span>`;

        listaCarrito.appendChild(item);
    })
}

function eliminarDelCarrito(index){
    carrito.splice(index, 1);//Elimina el elemento del array
    actualizarListaCarrito()//Actualiza la lista en el modal;
    guardarCarritoLocalStorage();
}

//funcion para revelar los juegos de consolas
function mostrarArticulos(productosFiltrados){
    const contenedor = document.getElementById("contenedorJuegos"); //Se usa el getbyID para acceder al contenedor donde se van a encontrar los juegos/Productos
    contenedor.innerHTML = ""; //se limpia el contenedor *innerHTML se usa para cambiar/agregar las propiedades de HTML desde JS*
    productosFiltrados.map(videojuegos => {//Se utiliza el metodo map para crear un array con los objetos/productos dentro de cards con boostrap
        const divProducto = document.createElement("div");//Se crea el nodo tipo elemento con la etiqueta section

        divProducto.classList.add("card", "m-2");//Se le agregan las clases de Boostrap,(como lo son las cards) desde JS en vez de html
        divProducto.style.width = "16rem";

        divProducto.innerHTML = `
            <div class="card-body">
                <img src="${videojuegos.img}" class="card-img-top" alt="${videojuegos.nombre}" style="width:222px; height: 280px;">
                <h5 class="card-title">${videojuegos.nombre}</h5>
                <p class="card-text">$ ${videojuegos.precio}</p>
                <p class="card-text">${videojuegos.descripcion}</p>
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
