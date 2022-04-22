/*El objetivos del programa es crear productos mediante POO para una heladeria, 
y luego que el cliente los vea mediante un array con sus respectivas info
*/
// Creo la clase producto para luego crear los objetos
class Envase {
    constructor (id, nombre, precio, peso) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        }
}

// Creo el array vacio
const envases = [];
// Creo los productos que la heladeria va a comercializar y los pusheo al array.
envases.push(new Envase(1, "1/4", 300, "250 grs"));
envases.push(new Envase(2, "1/2", 550, "500 grs"));
envases.push(new Envase(3, "1KG", 980, "1000 grs"));
envases.push(new Envase(4, "Vaso 2 bochas", 200, "150 grs"));
envases.push(new Envase(5, "Cucurucho", 250, "200 grs"));
envases.push(new Envase(6, "Capelina", 350, "300 grs"));

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

function nuevaFila(envase) {
    const row = document.createElement("tr");
    let aux = document.createElement("th");
    aux.innerText = envase.id;
    row.append(aux);

    aux = document.createElement("th");
    aux.innerText = envase.cantidad;

    row.append(aux);
    aux = document.createElement("th");
    aux.innerText = item.precio;
    row.append(aux);
    const eliminarBtn = document.createElement("button");
    eliminarBtn.className = "btn btn-danger";
    eliminarBtn.innerText = "Eliminar";
    const th = document.createElement("th");
    row.append(th);
    tabla.append(row);
}


// Funcion que sirve para crear objetos.
function crearObjeto() {
    const id = parseInt(document.getElementById("id").value);
    const nombre = document.getElementById("nombre").value;
    const precio = parseInt(document.getElementById("precio").value);
    const peso = document.getElementById("peso").value;
    return new Envase(id, nombre, precio, peso);
}

// Funcion que sirve para validar si se completaron los datos
function validarCampos() {
    return (
        parseInt(document.getElementById("id").value ) > 0 && 
        document.getElementById("nombre").value != "" &&
        parseInt(document.getElementById("precio").value) > 0 &&
        parseFloat(document.getElementById("peso").value) != ""
    );
}

// Evento que permite agregar productos.
const agregar = document.getElementById("2");
agregar.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validarCampos()) {
        const envase = crearObjeto();
        envases.push(envase);
        tablaProd(envase);
    }
});

// Todo este bloque sirve para crear una tabla con los objetos generados.
const contenedor = document.getElementById("ver");
contenedor.className = "table table-secondary";
const tabla = document.createElement("table");
tabla.setAttribute("border", "2");
const tblHead = document.createElement("thead");
// tblHead.innerHTML = "<tr><th>ID</th><th>Nombres</th><th>Precio</th><th>Gramos</th></tr>";
const tr = document.createElement("tr");
tr.innerHTML = "<th>ID</th><th>Nombres</th><th>Precio</th><th>Gramos</th>";
tblHead.appendChild(tr);
tabla.appendChild(tblHead);
const tblBody = document.createElement("tbody");
// Funcion para crear una tabla dentro del div.
function tablaProd(envase){
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${envase.id}</td><td>${envase.nombre}</td><td>${envase.precio}</td><td>${envase.peso}</td>`;
    tblBody.appendChild(fila);
    tabla.appendChild(tblBody);
    contenedor.append(tabla);
}

// Evento que permite ver los productos cargados.
const ver = document.getElementById("1");
ver.onclick = () => {
    envases.forEach((envases) => {
    tablaProd(envases);
    });
}

const eliminar = document.getElementById("4");
let pos = buscarItem(
    prompt("Ingrese el nombre del item a eliminar"),
    envases
);
if (pos >= 0) {
    envases.splice(pos, 1);
}


/*
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
*/
// envases.forEach((envases) => {
// tabla(envases);
// });

