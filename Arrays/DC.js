/*El objetivos del programa es crear productos mediante POO para una heladeria, 
y luego que el cliente los vea mediante un array con sus respectivas info
*/
// Creo la clase producto para luego crear los objetos
class Envase {
    constructor (id, nombre, precio, peso, cantGustos) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.cantGustos = cantGustos;
        }
}

// Creo los productos que la heladeria va a comercializar.
const cuarto = new Envase(1, "1/4", 300, "250 grs", 3);
const medio = new Envase(2, "1/2", 550, "500 grs", 4);
const kilo = new Envase(3, "1KG", 980, "1000 grs", 4);
const vaso = new Envase(4, "Vaso 2 bochas", 200, "150 grs", 2);
const cucurucho = new Envase(5, "Cucurucho", 250, "200 grs", 2);
const capelina = new Envase(6, "Capelina", 350, "300 grs", 3);

// Sumo los productos al Array
const envases = [];
envases.push(cuarto, medio, kilo, vaso, cucurucho, capelina);
console.log(envases);

// Funcion que sirve para aumentar precios.
function aumentar ( aumento , id, envases){
    for (const envase of envases){
        if(envase.id == id){
            envase.precio = envase.precio + aumento;
        }
    }
}
// Funcion que sirve para ver los productos que tiene el heladero.
function mostrarProductos(envases){
    for (const envase of envases){
        console.log("Datos de los envases")
        //console.log("id: "+envase.id+" nombre: "+envase.nombre+" Precio: "+envase.precio)
        console.log(envase);
    }
}
// Funcion que sirve para eliminar un producto.
function eliminarProductos(envases, id){
    let pos = console.log(envases.indexOf(id));
    envases.splice(pos,1);
}
// Funcion para ingresar al modo que el propietario quiera.
function seleccionModo(mensaje) {
    modo = prompt(mensaje);
    return modo
}
// Funcion que sirve para crear objetos.
function crearObjeto() {
    let entrada = parseInt(prompt("Ingrese la cantidad de productos que quiere agregar: "));
            for (let index = 0; index < entrada; index++) {
                let envase =  new Envase(prompt("Id"),
                                         prompt("Nombre"), 
                                         parseInt(prompt("Precio")), 
                                         prompt("Peso"),
                                         parseInt(prompt("Cantidad de gustos")));
                return envases.unshift(envase);
            }
}
mostrarProductos(envases);
id = parseInt(prompt("Ingrese el id del envase que desea eliminar : "));
eliminarProductos(envases, id);


do {
    switch (seleccionModo(
        "Elija la opcion deseada:\n 1 - Ver productos cargados\n 2 - Agregar un producto\n 3 - Aumentar precios\n 4 - Eliminar un producto\n 5 - Exit")
        ) {
        case "1":
            //Sirve para ver los productos que tiene el heladero.
            mostrarProductos(envases);
            break;
        case "2":
            // Esta parte del codigo le permite al dueño crear un nuevo producto.
            // Cuantos productos quiere agregar.
            crearObjeto();
            console.log(envases);
            break;
        case "3":
            id = parseInt(prompt("Ingrese el id del envase que desea modificar el precio: "));
            aumento = parseInt(prompt("Ingrese el aumento en $ que desea: "));

            if((id != null) && (id != "") && ((aumento != null) && (aumento != ""))){
                aumentar(aumento,id,envases);
                mostrarProductos(envases);
            }
            else{
                console.log("No se registraron cambios de Precio.");
            }
            break;
        case "4":
            mostrarProductos(envases);
            id = parseInt(prompt("Ingrese el id del envase que desea eliminar : "));
            eliminarProductos(envases, id);
            break;
        case "5":
            alert("Adios!");
            break;
        default:
            alert("Error");
            break;
    }
    mostrarProductos(envases);
} while (modo != "5");
