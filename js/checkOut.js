const tableBody = document.querySelector("tbody#compras");
const btnComprar = document.querySelector("button#btnComprar");
let costTotal; 

// LISTADO DE PRODUCTOS
function armarFilaHTML({ precio, imagen, nombre, cantidad, id }) {
    const precioProducto = parseInt(precio) * parseInt(cantidad);
    return `<tr>
    <td><img class="producto__imagen" src="${imagen}" alt="imagen ${nombre}"></td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>$ ${precioProducto} </td>
    <td id="${id}" class="boton-eliminar" title="Eliminar">⛔️</td>
    </tr>`;
}

// VER COSTO TOTAL
function calculoTotal() {
    let total = 0;
    carrito.forEach((producto) => {
        total += parseInt(producto.precio) * parseInt(producto.cantidad);
    });
    return total;
}

function mostrarTotal() {
    costTotal.innerHTML = "$" + calculoTotal();
}

// VER PRODUCTOS
function verCarrito() {
    tableBody.innerHTML = "";
    if (carrito.length > 0) {
        carrito.forEach((producto) => {
            tableBody.innerHTML += armarFilaHTML(producto);
        });
        activarClickEliminarProducto();
        mostrarTotal();
    } else {
        tableBody.innerHTML = "<tr><td colspan='5'>No tienes productos seleccionados</td></tr>"; // Se agrega una fila con un mensaje en caso de que no haya productos en el carrito
    }
}

// ELIMINAR PRODUCTOS
function eliminarProducto(productId) {
    const indice = carrito.findIndex((producto) => parseInt(producto.id) === parseInt(productId));
    carrito[indice].cantidad === 1 ? carrito.splice(indice, 1) : carrito[indice].cantidad--;
    guardarCarrito();
    verCarrito();
}

function activarClickEliminarProducto() {
    const botonesEliminar = document.querySelectorAll("td.boton-eliminar");
    botonesEliminar.forEach((botonEliminar) => {
        botonEliminar.addEventListener("click", () => eliminarProducto(botonEliminar.id));
    });
}

// FINALIZAR COMPRA
btnComprar.addEventListener("click", () => {
    finalizarCompra();
});

function finalizarCompra() {
    Swal.fire({
        icon: 'question',
        title: 'Finalizar compra',
        text: '¿Quieres ir a pagar?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            enviarWpp();
            window.location.href = LINK;
            eliminarCarrito();
            carrito.length = 0;
            btnComprar.setAttribute("disabled", "true");
            verCarrito();
        }
    });
}

function enviarWpp() {
    let mensaje = "";
    carrito.forEach((producto) => {
        mensaje += `%20idProducto:${producto.id}%20cantidad:${producto.cantidad}%20`;
    });
    const LINK = "https://wa.me/+573113441526?text=Hola!%20Me%20interesa%20saber%20mas%20sobre%20sus%20productos." + mensaje;
    return LINK;
}

document.addEventListener("DOMContentLoaded", function() {
    costTotal = document.querySelector("td#total");
    verCarrito(); 
});
