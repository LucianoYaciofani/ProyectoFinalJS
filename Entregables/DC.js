// Creo el array vacio
let envases = [];
let envasesAlmacenados = [];

// Creo los productos que la heladeria va a comercializar y los pusheo al array.
envases.push(new Envase(1, "1/4", 300, "250 grs"));
envases.push(new Envase(2, "1/2", 550, "500 grs"));
envases.push(new Envase(3, "1KG", 980, "1000 grs"));
envases.push(new Envase(4, "Vaso 2 bochas", 200, "150 grs"));
envases.push(new Envase(5, "Cucurucho", 250, "200 grs"));
envases.push(new Envase(6, "Capelina", 350, "300 grs"));

// Funcion para guardar en Json.
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

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
        document.getElementById("peso").value != ""
    );
}

// Evento que permite agregar productos.
const agregar = document.getElementById("btn-agregar");
agregar.onclick = () => {
    validarCampos() && agregarYAlmacenarObjeto();
};

// Funcion que agrega un nuevo envase al array y lo almacena en el Storage.
function agregarYAlmacenarObjeto () {
    const envNuevo = crearObjeto();
    envases.push(envNuevo);
    tablaProd(envNuevo);
    envasesAlmacenados = guardarLocal("listaProductos", JSON.stringify(envases));
};

// Todo este bloque sirve para crear el cuerpo de la tabla con los objetos.
const tblBody = document.getElementById("tBody");
// Funcion para crear una tabla dentro del div.
function tablaProd(envase){
    const pos = envases.indexOf(envase);
    const eliminarBtn = document.createElement("button");
    eliminarBtn.id = "eliminar";
    eliminarBtn.className = "btn btn-dark";
    eliminarBtn.innerText = "Eliminar";
    //Funcion que permite eliminar objetos.
    eliminarBtn.onclick = () => {
        envases.splice(pos, 1);
        console.log(envases);
        guardarLocal("listaProductos", JSON.stringify(envases));
        envasesAlmacenados = envases;
        actualizarTabla();
    };
    const th = document.createElement("th");
    th.append(eliminarBtn);
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${envase.id}</td><td>${envase.nombre}</td><td>${envase.precio}</td><td>${envase.peso}</td>`;
    fila.append(th);
    tblBody.appendChild(fila);
}

// Funcion para que la tabla se reinicie cada vez que se presione el boton.
function actualizarTabla(envase) {
    tblBody.innerHTML = "";
    envasesAlmacenados ? mostrarAlmacenados(envase) : mostrarOriginales(envase);
};

// Funcion para reducir lineas de codigo y poder implementar el operador ternario en actualizarTabla.
function mostrarAlmacenados(envase) {
    envases = envasesAlmacenados;
    envases.forEach((envase) => {
        tablaProd(envase);
        });
};

// Funcion para reducir lineas de codigo y poder implementar el operador ternario en actualizarTabla.
function mostrarOriginales(envase) {
    envases.forEach((envase) => {
        tablaProd(envase);
        });
};

// Evento que permite ver los productos cargados.
const ver = document.getElementById("1");
ver.onclick = (envase) => {
    actualizarTabla(envase);
};

// Evento de tipo submit para aumentar los precios de los productos.
const aumentar = document.getElementById("aumentar");
aumentar.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = document.getElementById("aumento").value;
    valor > 0 && aumentarYGuardar(valor);
});

// Funcion que sirve para aumentar el precio de los envases y guardarlos en el Storage.
function aumentarYGuardar(valor) {
    envases = envases.map((envase) => {
        return {
            id: envase.id,
            nombre: envase.nombre,
            // No quiero decimales por lo que aplico math.round.
            precio: Math.round((envase.precio * valor / 100) + envase.precio),
            peso: envase.peso,
        };
    });
    envasesAlmacenados = guardarLocal("listaProductos", JSON.stringify(envases));
    actualizarTabla();
};

// Acá almaceno en un nuevo array, el array guardado en el Local.
envasesAlmacenados = JSON.parse(localStorage.getItem("listaProductos"));