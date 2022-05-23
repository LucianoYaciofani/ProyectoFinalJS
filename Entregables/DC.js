// Creo el array vacio
let envases = [];
let envasesAlmacenados = [];

// Creo los productos que la heladeria va a comercializar y los pusheo al array.
/*
envases.push(new Envase(1, "1/4", 300, "250 grs"));
envases.push(new Envase(2, "1/2", 550, "500 grs"));
envases.push(new Envase(3, "1KG", 980, "1000 grs"));
envases.push(new Envase(4, "Vaso 2 bochas", 200, "150 grs"));
envases.push(new Envase(5, "Cucurucho", 250, "200 grs"));
envases.push(new Envase(6, "Capelina", 350, "300 grs"));
*/
// Funcion para guardar en Json.
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

// Funcion que sirve para crear objetos.
function crearObjeto() {
    const id = parseInt(document.getElementById("id").value);
    const nombre = document.getElementById("nombre").value;
    const precio = parseInt(document.getElementById("precio").value);
    const peso = document.getElementById("peso").value;
    return new Envase(id, nombre, precio, peso);
};

// Funcion que sirve para validar si se completaron los datos
function validarCampos() {
    return (
        parseInt(document.getElementById("id").value ) > 0 && 
        document.getElementById("nombre").value != "" &&
        parseInt(document.getElementById("precio").value) > 0 &&
        document.getElementById("peso").value != ""
    );
};

// Evento que permite agregar productos.
const agregar = document.getElementById("btn-agregar");
agregar.onclick = () => {
    validarCampos() && agregarYAlmacenarObjeto();
    // Si validar da true, tira alerta confirmatorio, sino erronea.
    const validar = validarCampos() ? true : false;
    validar ? alertaConfirm() : alertaError();
};

// Funcion que agrega un nuevo envase al array y lo almacena en el Storage.
function agregarYAlmacenarObjeto () {
    const envNuevo = crearObjeto();
    envases.push(envNuevo);
    tablaProd(envNuevo);
    ordenar();
    envasesAlmacenados = guardarLocal("listaProductos", JSON.stringify(envases));
};

// Funcion para tirar un alerta confirmatoria con Sweet Alert.
function alertaConfirm() {
    Swal.fire({
        title: 'Muy bien!',
        text: 'Has agregado el producto satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'OK'
    });
};

// Funcion para tirar un alerta erronea con Sweet Alert.
function alertaError() {
    Swal.fire({
        title: 'Error!',
        text: 'Te faltaron agregar datos del formulario',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
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
    //Funcion que permite eliminar objetos consultando previamente si lo desea hacer o no.
    eliminarBtn.onclick = () => {
        Swal.fire({
            title: 'Está seguro de eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Borrado!',
                    icon: 'success',
                    text: 'El envase ha sido borrado'
                });
                envases.splice(pos, 1);
                ordenar();
                guardarLocal("listaProductos", JSON.stringify(envases));
                envasesAlmacenados = envases;
                actualizarTabla();
            };
        });
        /*
        envases.splice(pos, 1);
        guardarLocal("listaProductos", JSON.stringify(envases));
        envasesAlmacenados = envases;
        actualizarTabla();*/
    };
    const th = document.createElement("th");
    th.append(eliminarBtn);
    const fila = document.createElement("tr");
    // Aplico desestructuracion de objetos dentro del array.
    let {id, nombre, precio, peso} = envase;
    for (envase of envases) {
        fila.innerHTML = `<td>${id}</td><td>${nombre}</td><td>${precio}</td><td>${peso}</td>`;
    }
    /*
    fila.innerHTML = `<td>${envase.id}</td><td>${envase.nombre}</td><td>${envase.precio}</td><td>${envase.peso}</td>`;*/
    fila.append(th);
    tblBody.appendChild(fila);
};

// Funcion para que la tabla se reinicie cada vez que se presione el boton.
function actualizarTabla(envase) {
    tblBody.innerHTML = "";
    envasesAlmacenados ? mostrarAlmacenados(envase) : mostrarOriginales(envase);
    guardarLocal("listaProductos", JSON.stringify(envases));
};

// Funcion para reducir lineas de codigo y poder implementar el operador ternario en actualizarTabla.
function mostrarAlmacenados() {
    envases = envasesAlmacenados;
    envases.forEach((envase) => {
        tablaProd(envase);
        });
};

// Funcion para reducir lineas de codigo y poder implementar el operador ternario en actualizarTabla.
function mostrarOriginales() {
    envases.forEach((envase) => {
        tablaProd(envase);
        });
};

// Evento que permite ver los productos cargados.
/*const ver = document.getElementById("1");
ver.onclick = (envase) => {
    actualizarTabla(envase);
};*/

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
        // Aplico desestructuracion para facilitar luego la forma de llamar cada atributo.
        let {id, nombre, precio, peso} = envase;
        return {
            id: id,
            nombre: nombre,
            // No quiero decimales por lo que aplico math.round.
            precio: Math.round((precio * valor / 100) + precio),
            peso: peso,
        };
    });
    envasesAlmacenados = guardarLocal("listaProductos", JSON.stringify(envases));
    actualizarTabla();
    Swal.fire({
        title: 'Muy bien!',
        text: 'Cambiaste los valores de los productos',
        icon: 'success',
        confirmButtonText: 'OK'
    });
};

// Acá almaceno en un nuevo array, el array guardado en el Local.
envasesAlmacenados = JSON.parse(localStorage.getItem("listaProductos"));

const guardarYSalir = document.getElementById("5");
guardarYSalir.onclick = () => {
    const divisor = document.createElement("div");
    divisor.innerHTML = `<p>Has salido del programa</p>`
    document.body.append(divisor);
}

// Funcion que ordena el array por id.
function ordenar() {
    if (envasesAlmacenados != null) {
        envasesAlmacenados.sort((actual, siguiente) => actual.id - siguiente.id);
    } else {
        envases.sort((actual, siguiente) => actual.id - siguiente.id);
    };
};


fetch("http://127.0.0.1:5500/Entregables/datos.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((envase) => {
            const ver = document.getElementById("1");
            ver.onclick = (envase) => {
                tablaProd(envase);
            };
        });
    });