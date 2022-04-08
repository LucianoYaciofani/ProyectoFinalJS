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

// Creo el array vacio
const envases = [];
// Creo los productos que la heladeria va a comercializar y los pusheo al array.
envases.push(new Envase(1, "1/4", 300, "250 grs", 3));
envases.push(new Envase(2, "1/2", 550, "500 grs", 4));
envases.push(new Envase(3, "1KG", 980, "1000 grs", 4));
envases.push(new Envase(4, "Vaso 2 bochas", 200, "150 grs", 2));
envases.push(new Envase(5, "Cucurucho", 250, "200 grs", 2));
envases.push(new Envase(6, "Capelina", 350, "300 grs", 3));

// Funcion que sirve para crear objetos.
function crearObjeto() {
    let entrada = parseInt(prompt("Ingrese la cantidad de productos que quiere agregar: "));
            for (let index = 0; index < entrada; index++) {
                let id = parseInt(prompt("Id"));
                let nombre = prompt("Nombre");
                let precio = parseInt(prompt("Precio"));
                let peso = prompt("Peso");
                let cantGustos = parseInt(prompt("Cantidad de gustos"));
                return new Envase(id, nombre, precio, peso, cantGustos);
            }
}

// Aplica el forEach en la funcion mostrarProductos.
function mostrarProductos(envases) {
    envases.forEach( (envase) => {
        console.log("Datos de los envases")
        console.log(envase)
    })
}

// Funcion que permite buscar un item.
function buscarItem(nombre, env) {
    let i = env.length - 1;
    while (i >= 0 && nombre != env[i].nombre) {
        i--;
    }
    return i;
}

// Funcion que sirve para aumentar precios.
function aumentarPrecio(aumento,id,envases){
    for (const envase of envases){
        if(envase.id == id){
            envase.precio = envase.precio + aumento;
        }
    }
}

// Funcion para ingresar al modo que el propietario quiera.
function seleccionModo(mensaje) {
    modo = parseInt(prompt(mensaje));
    return modo
}


do {
    switch (seleccionModo(
        "Elija la opcion deseada:\n 1 - Ver productos cargados\n 2 - Agregar un producto\n 3 - Aumentar precios\n 4 - Eliminar un producto\n 5 - Exit")
        ) {
        case 1:
            // Sirve para ver los productos que tiene el heladero.
            mostrarProductos(envases);
            break;
        case 2:
            // Esta parte del codigo le permite al dueño crear un nuevo producto.
            // Cuantos productos quiere agregar.
            envases.push(crearObjeto());
            mostrarProductos(envases);
            break;
        case 3:
            id = parseInt(prompt("Ingrese el id del envase que desea modificar el precio: "));
            aumento = parseInt(prompt("Ingrese el aumento en $ que desea: "));

            if((id != null) && (id != "") && ((aumento != null) && (aumento != ""))){
                aumentarPrecio(aumento,id,envases);
                mostrarProductos(envases);
            }
            else{
                console.log("No se registraron cambios de Precio.");
            }
            break;
        case 4:
            let pos = buscarItem(
                prompt("Ingrese el nombre del item a eliminar"),
                envases
            );
            if (pos >= 0) {
                envases.splice(pos, 1);
            }
            mostrarProductos(envases);
            break;
        case 5:
            alert("Adios!");
            break;
        default:
            alert("Error");
            break;
    }
} while (modo != 5);