const URL = 'js/productos.json'
const productos = []
const contenedor = document.querySelector("div#contenedor")
const botonCarrito = document.querySelector("div#imgCarro")

const gifCarga = `<img src="./img/gifCarga.gif">`

// AGREGAR PRODUCTOS
function retornarCardHTML({ imagen, nombre, precio, precioOff, id, disponible }) {
    if (disponible === "true") {
        return `<div class="producto">            
                    <img class="producto__imagen" src="${imagen}" alt="imagen ${nombre}">
                    <div class="producto__informacion">
                        <p class="producto__nombre">${nombre}</p>
                        <p class="producto__precio-r"><b>$${precio}</b></p>
                        <button id="${id}" class="button button-add pointer" title="Pulsa para comprar">COMPRAR</button>
                    </div>
                </div>`
    } else {
        return `<div class="producto">            
                    <img class="producto__imagen" src="${imagen}" alt="">
                    <div class="producto__informacion">
                        <p class="producto__nombre">${nombre}</p>
                        <p class="producto__precio"><b>AGOTADO</b></p>
                    </div>
                </div>`
    }
}

function retornarCardError() {
    return `<div class="error">
                <h2>No se han podido encontrar productos</h2>
            </div>`
}

function retornoProductoNuevo(productoSeleccionado) {
    return productoNuevo = {
        id: productoSeleccionado.id,
        imagen: productoSeleccionado.imagen,
        nombre: productoSeleccionado.nombre,
        cantidad: 1,
        precioOff: productoSeleccionado.precioOff,
        precio: productoSeleccionado.precio,
        categoria: productoSeleccionado.categoria
    }
}

// Función de carga de productos
function cargarProductos(array) {
    contenedor.innerHTML = ""
    if (array.length > 0) {
        array.forEach((producto) => {
            contenedor.innerHTML += retornarCardHTML(producto)
        })
        activarClickEnBotones()
    } else {
        contenedor.innerHTML += retornarCardError()
    }
}

async function obtenerProductos() {
    try {
        const response = await fetch(URL)
        if (response.ok) {
            const data = await response.json()
            productos.push(...data)
        } else {
            throw new Error("No se pudo cargar los productos")
        }
        cargarProductos(productos)
    } catch (error) {
        contenedor.innerHTML = retornarCardError()
        console.error(error)
    }
}
obtenerProductos()

// ACTIVAR COMPRA
function activarClickEnBotones() {
    const botonesComprar = document.querySelectorAll("button.button-add")
    for (let boton of botonesComprar) {
        boton.addEventListener("click", () => {
            const productoSeleccionado = productos.find((producto) => parseInt(producto.id) === parseInt(boton.id))
            const existeEnCarrito = carrito.findIndex((producto) => parseInt(producto.id) === parseInt(productoSeleccionado.id))
            if (existeEnCarrito === -1) {
                const productoNuevo = retornoProductoNuevo(productoSeleccionado)
                carrito.push(productoNuevo)
            } else {
                carrito[existeEnCarrito].cantidad++
            }
            guardarCarrito()
            SeleccionarProducto()
        })
    }
}

// Eventos carrito
botonCarrito.addEventListener("mousemove", () => {
    botonCarrito.title = carrito.length > 0 ? `${carrito.length} producto(s) en carrito` : `Ir al carrito`
})

botonCarrito.addEventListener("click", () => {
    carrito.length > 0 ? location.href = "checkout.html" : carroVacio()
})

function carroVacio() {
    swal.fire({
        title: 'Error',
        text: 'Debes agregar productos al carrito',
    })
}

// Función para seleccionar producto
function SeleccionarProducto() {
    Swal.fire({
        icon: 'question',
        title: 'Carrito de compras',
        text: '¿Quieres seleccionar mas productos?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            // La ventana modal desaparece automáticamente al seleccionar 'Sí'
        } else {
            location.href = "checkout.html"; // Redirige a la página de compra
        }
    });
}
