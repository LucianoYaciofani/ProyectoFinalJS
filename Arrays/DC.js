/*El objetivos del programa es crear productos mediante POO para una heladeria, 
y luego que el cliente los vea mediante un array con sus respectivas info
*/

// Creo la clase producto para luego crear los objetos
class Producto {
    constructor (producto, precio, peso, cantGustos) {
        this.producto = producto;
        this.precio = precio;
        this.peso = peso;
        this.cantGustos = cantGustos;
    }
}

// Creo los productos que la heladeria va a comercializar.
const cuarto = new Producto("1/4", 300, "250 grs", 3);
const medio = new Producto("1/2", 550, "500 grs", 4);
const kilo = new Producto("1KG", 980, "1000 grs", 4);
const vaso = new Producto("Vaso 2 bochas", 200, "150 grs", 2);
const cucurucho = new Producto("Cucurucho", 250, "200 grs", 2);
const capelina = new Producto("Capelina", 350, "300 grs", 3);

// Sumo los productos al Array
const productos = [];
productos.push(cuarto, medio, kilo, vaso, cucurucho, capelina);
console.log(productos);


// Funcion para ingresar al modo que el propietario quiera.
function seleccionModo() {
    modo = prompt(
    "Elija la opcion deseada:\n 1 - Ver productos cargados\n 2 - Agregar un producto\n 3 - Exit"
    );
    return modo
}
//Sirve para ver los productos que tiene el heladero.
function mostrarProductos(productos) {
    console.clear();
    for (const producto of productos) {
        console.log(producto);
    }
}
const precioAumento = (productos,aumento)=> {
    for (producto in productos) {
        productos[producto].precio = aumento[producto];
    }
    return productos;
}

do {
    switch (seleccionModo()) {
        case "1":
            //Sirve para ver los productos que tiene el heladero.
            mostrarProductos(productos);
            break;
        case "2":
            // Esta parte del codigo le permite al dueño crear un nuevo producto.
            // Cuantos productos quiere agregar.
            let entrada = parseInt(prompt("Ingrese la cantidad de productos que quiere agregar: "));
            for (let index = 0; index < entrada; index++) {
                let producto =  new Producto(prompt("Producto"), 
                                             prompt("Precio"), 
                                             prompt("Peso"),
                                             prompt("Cantidad de gustos"));
                productos.unshift(producto);
            }
            console.log(productos);
            break;
        case "3":
            alert("Adios!");
            break;
        default:
            alert("Error");
            break;
    }
    mostrarProductos(productos);
} while (modo != "3");
