
function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("miCarrito")) ?? []
}

function guardarCarrito() {
    localStorage.setItem("miCarrito", JSON.stringify(carrito))
}

function eliminarCarrito() { 
    localStorage.removeItem("miCarrito") 
}

const carrito = recuperarCarrito()