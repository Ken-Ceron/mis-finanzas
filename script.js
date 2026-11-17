const gastosMensuales = document.querySelectorAll(
    "#lista-gastos input"
);

const totalMensual = document.querySelector(
    "#total-mensual"
);

function calcularGastosMensuales() {
    const inputsActuales = document.querySelectorAll("#lista-gastos input");
    let total = 0;

    inputsActuales.forEach(function(input) {
        total += Number(input.value) || 0;
    });

    totalMensual.textContent = "$" + total.toFixed(2);
    return total;
}
calcularGastosMensuales();

const tablaMensual = document.querySelector("#lista-gastos");
tablaMensual.addEventListener("input", calcularResumen);
tablaMensual.addEventListener("input", guardarGastos);

/// Calcular gastos quincenales

const gastosQuincenales = document.querySelectorAll(
    "#lista-quincenales input"
);
console.log(gastosQuincenales.length);
const totalQuincenal = document.querySelector(
    "#total-quincenal"
);

function calcularGastosQuincenales (){
    const inputsActuales = document.querySelectorAll("#lista-quincenales input");
    let total = 0;
    inputsActuales.forEach(function(input){
        total += Number(input.value) || 0;
    });
    totalQuincenal.textContent = "$" + total.toFixed(2);
    return total;
}
calcularGastosQuincenales();
const tablaQuincenal = document.querySelector("#lista-quincenales");
tablaQuincenal.addEventListener("input", calcularResumen);
tablaQuincenal.addEventListener("input", guardarGastos);

const ingresoQuincenal = document.querySelector(
    "#ingreso"
)

/// Calcular resumen

function calcularResumen() {
    let mensual = calcularGastosMensuales();
    let quincenal = calcularGastosQuincenales();
    let ingreso = Number(ingresoQuincenal.value);
    let disponible = ingreso - quincenal - mensual/2;
    let mama = Number(dineroMama.value);
    let papa = Number(dineroPapa.value);
    let principal = mensual/2 + mama + papa;
    let secundaria = ingreso - principal;
    cuentaSecundaria.textContent = "$" + secundaria.toFixed(2);
    cuentaPrincipal.textContent = "$" + principal.toFixed(2);
    resumenDisponible.textContent = "$" + disponible.toFixed(2); 
    resumenIngreso.textContent = "$" + ingreso.toFixed(2); 
    resumenMensuales.textContent = "$" + (mensual/2).toFixed(2);
    resumenQuincenales.textContent = "$" + quincenal.toFixed(2);
}
ingresoQuincenal.addEventListener("input", calcularResumen);
const dineroMama = document.querySelector("#dinero-mama");

const dineroPapa = document.querySelector("#dinero-papa");

const resumenDisponible = document.querySelector("#resumen-disponible");

const resumenIngreso = document.querySelector("#resumen-ingreso");

const resumenMensuales = document.querySelector("#resumen-mensuales");

const resumenQuincenales = document.querySelector("#resumen-quincenales");

const cuentaPrincipal = document.querySelector("#cuenta-principal");
const cuentaSecundaria = document.querySelector("#cuenta-secundaria");
calcularResumen();

/// Funcion Botones

const botonesAgregar = document.querySelectorAll(".agregar-gasto");

botonesAgregar.forEach(function(boton) {
    boton.addEventListener("click", function() {
        console.log(boton.id);
        const nuevaFila = document.createElement("tr");
        nuevaFila.classList.add("gasto-dinamico");
        const nuevaCelda = document.createElement("td");
        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        const celdaCantidad = document.createElement("td");
        const celdaEliminar = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        celdaEliminar.appendChild(botonEliminar);
        nuevaFila.appendChild(celdaEliminar);

        botonEliminar.addEventListener("click", function(){
            nuevaFila.remove();
            calcularResumen();
        });
        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        celdaCantidad.appendChild(inputCantidad);
        nuevaCelda.appendChild(inputNombre);
        nuevaFila.appendChild(nuevaCelda);
         nuevaFila.appendChild(celdaCantidad);
        if (boton.id === "agregar-mensual"){
            const tablaMensual = document.querySelector("#lista-gastos");
            tablaMensual.appendChild(nuevaFila);
        } else {
            const tablaQuincenal = document.querySelector("#lista-quincenales");
            tablaQuincenal.appendChild(nuevaFila);
        }
    });
});

/// Guardar Datos

function guardarGastos(){
    console.log("se ejecuto guardarGastos");
    const gastosMensualesGuardados =[];
    const gastosQuincenalesGuardados = [];
    const filasMensuales = document.querySelectorAll("#lista-gastos tr")
    filasMensuales.forEach(function(fila){
        const inputNombre = fila.querySelector('input[type ="text"');
        const inputCantidad = fila.querySelector('input[type="number"]');
        const nombre = inputNombre.value;
        const cantidad = Number(inputCantidad.value);
        const gasto = {
            nombre: nombre, 
            cantidad: cantidad
        }
        gastosMensualesGuardados.push(gasto);
    });
    const filasQuincenales = document.querySelectorAll("#lista-quincenales tr.gasto-dinamico");
    filasQuincenales.forEach(function(fila) {
    const inputNombre = fila.querySelector('input[type="text"]');
    const inputCantidad = fila.querySelector('input[type="number"]');

    const nombre = inputNombre.value;
    const cantidad = Number(inputCantidad.value);

    const gasto = {
        nombre: nombre,
        cantidad: cantidad
    };
    gastosQuincenalesGuardados.push(gasto);
 });
 


    localStorage.setItem("gastosMensuales", JSON.stringify(gastosMensualesGuardados));
    localStorage.setItem("gastosQuincenales", JSON.stringify(gastosQuincenalesGuardados));
};

/// Cargar Gastos
function cargarGastos() {
    const gastosMensuales = JSON.parse(localStorage.getItem("gastosMensuales")) || [];
    const gastosQuincenales = JSON.parse(localStorage.getItem("gastosQuincenales")) || [];

    crearFilas(gastosMensuales, document.querySelector("#lista-gastos"));
    crearFilas(gastosQuincenales, document.querySelector("#lista-quincenales"));
}

function crearFilas (gastos, tabla){
    gastos.forEach(function(gasto){
        const nuevaFila = document.createElement("tr");
        nuevaFila.classList.add("gasto-dinamico");
    const celdaNombre = document.createElement("td");
    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.value = gasto.nombre;
    celdaNombre.appendChild(inputNombre);
    nuevaFila.appendChild(celdaNombre);
    const celdaCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.value = gasto.cantidad;
    celdaCantidad.appendChild(inputCantidad);
    nuevaFila.appendChild(celdaCantidad);
    tabla.appendChild(nuevaFila);
    const celdaEliminar = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    celdaEliminar.appendChild(botonEliminar);
    nuevaFila.appendChild(celdaEliminar);
    botonEliminar.addEventListener("click", function(){
        nuevaFila.remove();
        guardarGastos();
        calcularResumen();
    });
    });

}
cargarGastos();
const inputIngreso = document.querySelector("#ingreso");

inputIngreso.addEventListener("input", function() {
    localStorage.setItem("ingresoGuardado", inputIngreso.value);
});

const ingresoGuardado = localStorage.getItem("ingresoGuardado");

if (ingresoGuardado !== null) {
    inputIngreso.value = ingresoGuardado;
}

const inputMama = document.querySelector("#dinero-mama");
const inputPapa = document.querySelector("#dinero-papa");

// Guardar los valores
inputMama.addEventListener("input", function() {
    localStorage.setItem("dineroMama", inputMama.value);
});

inputPapa.addEventListener("input", function() {
    localStorage.setItem("dineroPapa", inputPapa.value);
});

// Recuperar los valores
const dineroMamaGuardado = localStorage.getItem("dineroMama");
const dineroPapaGuardado = localStorage.getItem("dineroPapa");

if (dineroMamaGuardado !== null) {
    inputMama.value = dineroMamaGuardado;
}

if (dineroPapaGuardado !== null) {
    inputPapa.value = dineroPapaGuardado;
}

calcularResumen();

