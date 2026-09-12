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
    //Argumentar que carrito sera los elementos llamados por la id
    const contenedorCarrito = document.getElementById('galeria-carrito');
    if (contenedorCarrito) {
        mostrarCarrito(contenedorCarrito);
    }
    //mostrar los productos en el carrito
    function mostrarCarrito(contenedor) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contenedor.innerHTML = ''; 

        if (carrito.length === 0) {
            contenedor.innerHTML = '<h6 class="mensajeSinResultados">El carrito está vacío...</h6>';
            return;
        }

        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('producto-carrito'); // Mantenemos la clase de la tarjeta
            div.innerHTML = `
                <img src="${item.imagen}" alt="${item.titulo}" class="img-producto-carrito">
                <div class="info-producto-carrito">
                    <h3>${item.titulo}</h3>
                    <p>${item.precio}</p>
                </div>
                <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>`;
            contenedor.appendChild(div);
        });
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
    ///////////////logeo//////////////////
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputUsuarioElemento = document.getElementById('inputUsuario');
            const inputPasswordElemento = document.getElementById('inputPassword');

            const inputUsuario = inputUsuarioElemento.value.trim();
            const inputPassword = inputPasswordElemento.value.trim();

            const errorUsuario = document.getElementById('errorUsuario');
            const errorPassword = document.getElementById('errorPassword');
            const errorGeneral = document.getElementById('errorGeneral');

            if (errorUsuario) errorUsuario.textContent = '';
            if (errorPassword) errorPassword.textContent = '';
            if (errorGeneral) errorGeneral.textContent = '';

            let hayError = false;

            if (inputUsuario === '') {
                if (errorUsuario) errorUsuario.textContent = 'Debe ingresar el usuario.';
                hayError = true;
            }

            if (inputPassword === '') {
                if (errorPassword) errorPassword.textContent = 'Debe ingresar la contraseña.';
                hayError = true;
            }

            if (hayError) return;
            
            if (inputUsuario === 'UsuarioGenerico' && inputPassword === '12345678') {
                const usuarioActivo = {
                    nombre: inputUsuario,
                    foto: 'img/micelaneos/Momonga.png'
                };
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
                window.location.href = 'perfil.html';
            } else {
                inputUsuarioElemento.value = '';
                inputPasswordElemento.value = '';

                if (inputUsuario !== 'UsuarioGenerico') {
                    if (errorUsuario) errorUsuario.textContent = 'Usuario desconocido.';
                }

                if (inputPassword !== '12345678') {
                    if (errorPassword) errorPassword.textContent = 'Contraseña erronea.';
                }
            }
        });
    }
    ///////////Cargar perfil con datos//////////////
    const contenedorPerfil = document.getElementById('info-usuario');
    const contenedorFavoritos = document.getElementById('galeria-favoritos');

    if (contenedorPerfil) {
        const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

        if (!usuarioActivo) {
            window.location.href = 'inicioSesion.html';
        } else {
            contenedorPerfil.innerHTML = `
                <img src="${usuarioActivo.foto}" alt="Avatar" class="img-perfil">
                <h3>¡Hola, ${usuarioActivo.nombre}!</h3>
                <p>Aqui podras administrar tus favoritos.</p>
                <button class="btn-logout" onclick="cerrarSesion()">Cerrar Sesión</button>
            `;
        }
    }
    if (contenedorFavoritos) {
        mostrarFavoritos(contenedorFavoritos);
    }
    //////////añadir favoritos///////////
    const botonesFavorito = document.querySelectorAll('.btn-favorito');
    botonesFavorito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

            if (!usuarioActivo) {
                alert('Debes iniciar sesión para guardar productos en tus favoritos.');
                window.location.href = 'inicioSesion.html';
                return;
            }

            const tarjeta = e.target.closest('.producto');
            const producto = {
                titulo: tarjeta.querySelector('h3').innerText,
                precio: tarjeta.querySelectorAll('p')[1].innerText,
                imagen: tarjeta.querySelector('img').src
            };
            agregarAFavoritos(producto);
        });
    });
});
//funcion para eliminar del carrito
function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload();
}
    ////////////funciones de el perfil////////////////////
function eliminarFavorito(index) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.splice(index, 1);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    location.reload();
}

function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    alert("Has cerrado sesión.");
    window.location.href = 'index.html';
}

function mostrarFavoritos(contenedor) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    contenedor.innerHTML = '';

    if (favoritos.length === 0) {
        contenedor.innerHTML = '<h6 class="mensajeSinResultados">Aún no tienes productos guardados en favoritos 💔.</h6>';
        return;
    }

    favoritos.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}" class="img-producto-carrito">
            <div class="info-producto-carrito">
                <h3>${item.titulo}</h3>
                <p>${item.precio}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarFavorito(${index})">Quitar de Favoritos</button>`;
        contenedor.appendChild(div);
    });
}
/////////agregar a favoritos 2////////////
function agregarAFavoritos(producto) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Comprobar si el producto ya fue guardado previamente
    const existe = favoritos.some(fav => fav.titulo === producto.titulo);
    if (existe) {
        alert('Este producto ya está en tus favoritos.');
        return;
    }

    favoritos.push(producto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert(`¡${producto.titulo} fue añadido a tus favoritos! ❤️`);
}
