document.addEventListener('DOMContentLoaded', () => {
    //////////////AÑADIR AL CARRITO/////////////////////
    //Obtener la informacion
    const botonesCarrito = document.querySelectorAll('.btn-carrito');
    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const tarjeta = e.target.closest('.producto');
            const producto = {
                titulo: tarjeta.querySelector('h3').innerText,
                precio: tarjeta.querySelectorAll('p')[1].innerText,
                imagen: tarjeta.querySelector('img').src
            };
            agregarAlCarrito(producto);
        });
    });
    //Guardar la info
    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`¡${producto.titulo} fue añadido al carrito!`);
    }
    //mostrar los productos en el carrito
    const contenedorCarrito = document.getElementById('lista-carrito');
    if (contenedorCarrito) {
        mostrarCarrito(contenedorCarrito);
    }

    function mostrarCarrito(contenedor) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contenedor.innerHTML = ''; 
        if (carrito.length === 0) {
            contenedor.innerHTML = '<p>El carrito está vacío.</p>';
            return;
        }

        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('producto-carrito');
            div.innerHTML = `
                <img src="${item.imagen}" width="80">
                <div>
                    <h3>${item.titulo}</h3>
                    <p>${item.precio}</p>
                </div>
                <button onclick="eliminarProducto(${index})">Eliminar</button>`;
            contenedor.appendChild(div);
        });
    }
});
//funcion para eliminar
function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}
    //////////////BUSCADOR/////////////////////
const inputBusqueda = document.getElementById('taskInput');
const productos = document.querySelectorAll('.producto');
const mensajeSinResultados = document.getElementById('sinResultados');

if (inputBusqueda) {
    inputBusqueda.addEventListener('input', () => {
        const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
        let coincidencias = 0;
        productos.forEach(producto => {
            const titulo = producto.querySelector('h3').textContent.toLowerCase();
            if (titulo.includes(textoBusqueda)) {
                producto.style.display = 'flex';
                coincidencias++;
            } else {
                producto.style.display = 'none';
            }
        });

        if (mensajeSinResultados) {
            if (coincidencias === 0) {
                mensajeSinResultados.style.display = 'block';
            } else {
                mensajeSinResultados.style.display = 'none';
            }
        }
    });
}