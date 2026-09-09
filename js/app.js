async function cargarComponentes() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    if (headerContainer) {
        try {
            const respHeader = await fetch('components/header.html'); 
            if (respHeader.ok) {
                headerContainer.innerHTML = await respHeader.text();
                actualizarContadorCarrito();
            } else {
                console.error("No se encontró el archivo del header.");
            }
        } catch (error) {
            console.error("Error cargando el header:", error);
        }
    }

    if (footerContainer) {
        try {
            const respFooter = await fetch('components/footer.html'); 
            if (respFooter.ok) {
                footerContainer.innerHTML = await respFooter.text();
            } else {
                console.error("No se encontró el archivo del footer.");
            }
        } catch (error) {
            console.error("Error cargando el footer:", error);
        }
    }
}

const listaDeProductos = [
    { id: "MC001", codigo: "MC001", categoria: "Mat. Construcción", nombre: "Cemento Polpaico gris 25 kg", marca: "Polpaico", unidad: "Saco", pVenta: 5990, stock: 80, stockMinimo: 20 },
    { id: "MC002", codigo: "MC002", categoria: "Mat. Construcción", nombre: "Cemento Melón blanco 25 kg", marca: "Melón", unidad: "Saco", pVenta: 7490, stock: 40, stockMinimo: 10 },
    { id: "MC003", codigo: "MC003", categoria: "Mat. Construcción", nombre: "Mortero cola cerámica 25 kg", marca: "Volcán", unidad: "Saco", pVenta: 5200, stock: 50, stockMinimo: 15 },
    { id: "PT001", codigo: "PT001", categoria: "Pinturas", nombre: "Pintura látex interior 1 galón blanco", marca: "Ceresita", unidad: "Galón", pVenta: 9990, stock: 40, stockMinimo: 10 },
    { id: "PT002", codigo: "PT002", categoria: "Pinturas", nombre: "Pintura látex interior 4 litros", marca: "Sherwin Williams", unidad: "Tineta", pVenta: 12990, stock: 30, stockMinimo: 8 },
    { id: "PT003", codigo: "PT003", categoria: "Pinturas", nombre: "Pintura látex exterior 1 galón blanco", marca: "Sika", unidad: "Galón", pVenta: 13990, stock: 25, stockMinimo: 5 },
    { id: "HM001", codigo: "HM001", categoria: "Herramientas", nombre: "Martillo carpintero 500g", marca: "Stanley", unidad: "Unidad", pVenta: 7990, stock: 20, stockMinimo: 5 },
    { id: "HM002", codigo: "HM002", categoria: "Herramientas", nombre: "Alicate universal 8\"", marca: "Total", unidad: "Unidad", pVenta: 7290, stock: 15, stockMinimo: 4 },
    { id: "HM003", codigo: "HM003", categoria: "Herramientas", nombre: "Destornillador plano 6x100mm", marca: "Knipex", unidad: "Unidad", pVenta: 1990, stock: 30, stockMinimo: 10 },
    { id: "GS001", codigo: "GS001", categoria: "Gasfitería", nombre: "Cañería PVC 1/2\" x 6m", marca: "Tigre", unidad: "Barra", pVenta: 5490, stock: 30, stockMinimo: 8 },
    { id: "GS002", codigo: "GS002", categoria: "Gasfitería", nombre: "Cañería PVC 3/4\" x 6m", marca: "Tigre", unidad: "Barra", pVenta: 7490, stock: 25, stockMinimo: 6 },
    { id: "GS003", codigo: "GS003", categoria: "Gasfitería", nombre: "Cañería cobre 1/2\" x 5m", marca: "Coproch", unidad: "Barra", pVenta: 17990, stock: 15, stockMinimo: 4 },
    { id: "EL001", codigo: "EL001", categoria: "Electricidad", nombre: "Cable unipolar 1.5mm² (por metro)", marca: "Copelec", unidad: "Metro", pVenta: 590, stock: 100, stockMinimo: 25 },
    { id: "EL002", codigo: "EL002", categoria: "Electricidad", nombre: "Cable unipolar 2.5mm² (por metro)", marca: "Copelec", unidad: "Metro", pVenta: 790, stock: 100, stockMinimo: 25 },
    { id: "EL003", codigo: "EL003", categoria: "Electricidad", nombre: "Cable dúplex paralelo 2x1.5mm²", marca: "Copelec", unidad: "Metro", pVenta: 990, stock: 80, stockMinimo: 20 },
    { id: "TR001", codigo: "TR001", categoria: "Tornillería", nombre: "Tornillo autoperf. 8x1\" caja 100u", marca: "Fischer", unidad: "Caja", pVenta: 2990, stock: 40, stockMinimo: 10 },
    { id: "TR002", codigo: "TR002", categoria: "Tornillería", nombre: "Tornillo madera 4x40mm caja 100u", marca: "Fischer", unidad: "Caja", pVenta: 2490, stock: 40, stockMinimo: 10 },
    { id: "TR003", codigo: "TR003", categoria: "Tornillería", nombre: "Tornillo volcanita caja 200u", marca: "Fischer", unidad: "Caja", pVenta: 3490, stock: 30, stockMinimo: 8 },
    { id: "MD001", codigo: "MD001", categoria: "Madera", nombre: "Pino cepillado 1x3\" x 3m", marca: "Arauco", unidad: "Unidad", pVenta: 4290, stock: 40, stockMinimo: 10 },
    { id: "MD002", codigo: "MD002", categoria: "Madera", nombre: "Pino cepillado 2x4\" x 3m", marca: "Arauco", unidad: "Unidad", pVenta: 7490, stock: 30, stockMinimo: 8 }
];

let carrito = JSON.parse(localStorage.getItem('carritoFerret')) || [];

function renderizarCatalogo(productosAMostrar = listaDeProductos) {
    const contenedor = document.getElementById('catalogo-productos');
    if (!contenedor) return;

    contenedor.innerHTML = "";
    
    if (productosAMostrar.length === 0) {
        contenedor.innerHTML = "<p class='no-products-msg'>No se encontraron productos.</p>";
        return;
    }

    productosAMostrar.forEach(prod => {
        const claseStock = prod.stock <= prod.stockMinimo ? 'text-danger' : 'text-success';
        contenedor.innerHTML += `
            <article class="card product-card">
                <div class="product-card-body">
                    <span class="badge-category">${prod.categoria}</span>
                    <h3 class="product-name">${prod.nombre}</h3>
                    <p class="product-info">Marca: <strong>${prod.marca}</strong> | Unid: ${prod.unidad}</p>
                    <p class="product-stock ${claseStock}">Stock: <strong>${prod.stock} ${prod.unidad}</strong></p>
                </div>
                <div class="product-card-footer">
                    <p class="product-price">$ ${prod.pVenta.toLocaleString('es-CL')}</p>
                    <button class="btn-accent btn-full" onclick="agregarAlCarrito('${prod.id}')">Añadir al carrito</button>
                </div>
            </article>
        `;
    });
}

function renderizarDestacadosIndex() {
    const contenedor = document.getElementById('catalogo-destacado');
    if (!contenedor) return;

    contenedor.innerHTML = "";
    const destacados = listaDeProductos.slice(0, 4);

    destacados.forEach(prod => {
        const claseStock = prod.stock <= prod.stockMinimo ? 'text-danger' : 'text-success';
        contenedor.innerHTML += `
            <article class="card product-card">
                <div class="product-card-body">
                    <span class="badge-category">${prod.categoria}</span>
                    <h3 class="product-name">${prod.nombre}</h3>
                    <p class="product-info">Marca: <strong>${prod.marca}</strong> | Unid: ${prod.unidad}</p>
                    <p class="product-stock ${claseStock}">Stock: <strong>${prod.stock} ${prod.unidad}</strong></p>
                </div>
                <div class="product-card-footer">
                    <p class="product-price">$ ${prod.pVenta.toLocaleString('es-CL')}</p>
                    <button class="btn-accent btn-full" onclick="agregarAlCarrito('${prod.id}')">Añadir al carrito</button>
                </div>
            </article>
        `;
    });
}

function configurarFiltros() {
    const inputBuscar = document.getElementById('input-buscar');
    const selectCat = document.getElementById('select-categoria');
    
    if (!inputBuscar || !selectCat) return;

    function aplicarFiltros() {
        const texto = inputBuscar.value.toLowerCase();
        const categoriaSeleccionada = selectCat.value;

        const filtrados = listaDeProductos.filter(prod => {
            const coincideTexto = prod.nombre.toLowerCase().includes(texto) || prod.marca.toLowerCase().includes(texto);
            const coincideCat = categoriaSeleccionada === "" || prod.categoria === categoriaSeleccionada;
            return coincideTexto && coincideCat;
        });

        renderizarCatalogo(filtrados);
    }

    inputBuscar.addEventListener('input', aplicarFiltros);
    selectCat.addEventListener('change', aplicarFiltros);
}

window.agregarAlCarrito = function(id) {
    const producto = listaDeProductos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem('carritoFerret', JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito.`);
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const cartBotones = document.querySelectorAll('.btn-primary');
    cartBotones.forEach(btn => {
        if (btn.innerHTML.includes('Cart') || btn.innerHTML.includes('🛒')) {
            btn.innerHTML = `🛒 Cart (${carrito.length})`;
        }
    });
}

function renderizarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    if (!contenedor) return;
    
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='cart-empty-msg'>Tu carrito está vacío.</p>";
        return;
    }

    contenedor.innerHTML = "";
    let total = 0;
    
    carrito.forEach((prod, index) => {
        total += prod.pVenta;
        contenedor.innerHTML += `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <strong>${prod.nombre}</strong>
                    <p class="cart-item-unit">${prod.unidad}</p>
                </div>
                <p class="cart-item-price">$ ${prod.pVenta.toLocaleString('es-CL')}</p>
                <button onclick="eliminarDelCarrito(${index})" class="btn-delete-cart" title="Eliminar">❌</button>
            </div>
        `;
    });
    
    contenedor.innerHTML += `<h3 class="cart-total-price">Total: $ ${total.toLocaleString('es-CL')}</h3>`;
}

window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carritoFerret', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

const datosRegiones = {
    "Región de Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Región Metropolitana": ["Santiago", "San Bernardo", "Puente Alto", "Maipú", "Providencia"]
};

function esCorreoValido(email) {
    return email.endsWith('@duoc.cl') || email.endsWith('@profesor.duoc.cl') || email.endsWith('@gmail.com');
}

function esPasswordValido(password) {
    return password.length >= 4 && password.length <= 10;
}

function esRunValido(run) {
    const regexRun = /^[0-9]+[0-9kK]$/;
    return regexRun.test(run) && run.length >= 7 && run.length <= 9;
}

function ocultarMensajesErrorIniciales() {
    const errores = document.querySelectorAll('[id^="error-"]');
    errores.forEach(el => {
        el.style.display = 'none';
    });
}

function manejarError(inputId, esInvalido) {
    const input = document.getElementById(inputId);
    const mensajeError = document.getElementById(`error-${inputId}`);
    if (!input || !mensajeError) return;
    
    if (esInvalido) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.style.borderColor = '#d32f2f';
        
        mensajeError.style.display = 'block';
        mensajeError.style.color = '#d32f2f';
        mensajeError.style.fontSize = '0.85rem';
        mensajeError.style.marginTop = '5px';
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        input.style.borderColor = '#2e7d32';
        
        mensajeError.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    
    await cargarComponentes(); 

    ocultarMensajesErrorIniciales();

    renderizarCatalogo();
    renderizarDestacadosIndex();
    configurarFiltros();
    renderizarCarrito();

    const selectRegion = document.getElementById('reg-region');
    const selectComuna = document.getElementById('reg-comuna');
    if (selectRegion && selectComuna) {
        for (let region in datosRegiones) {
            let option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            selectRegion.appendChild(option);
        }

        selectRegion.addEventListener('change', function() {
            const regionSeleccionada = this.value;
            selectComuna.innerHTML = '<option value="">Seleccione una comuna...</option>';
            if (regionSeleccionada) {
                selectComuna.disabled = false;
                datosRegiones[regionSeleccionada].forEach(comuna => {
                    let option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    selectComuna.appendChild(option);
                });
            } else {
                selectComuna.disabled = true;
            }
        });
    }

    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            let email = document.getElementById('login-email').value;
            let pass = document.getElementById('login-pass').value;
            let emailInvalido = !esCorreoValido(email);
            let passInvalido = !esPasswordValido(pass);
            
            manejarError('login-email', emailInvalido);
            manejarError('login-pass', passInvalido);
            
            if (!emailInvalido && !passInvalido) {
                alert("¡Inicio de sesión exitoso!");
                window.location.href = "index.html"; 
            }
        });
    }

    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            let run = document.getElementById('reg-run').value;
            let nombre = document.getElementById('reg-nombre').value;
            let email = document.getElementById('reg-email').value;
            let pass = document.getElementById('reg-pass').value;
            let region = document.getElementById('reg-region').value;
            let comuna = document.getElementById('reg-comuna').value;

            let runInvalido = !esRunValido(run);
            let nombreInvalido = nombre.trim() === "";
            let emailInvalido = !esCorreoValido(email);
            let passInvalido = !esPasswordValido(pass);
            let regionInvalida = region === "";
            let comunaInvalida = comuna === "";

            manejarError('reg-run', runInvalido);
            manejarError('reg-nombre', nombreInvalido);
            manejarError('reg-email', emailInvalido);
            manejarError('reg-pass', passInvalido);
            manejarError('reg-region', regionInvalida);
            manejarError('reg-comuna', comunaInvalida);

            if (!runInvalido && !nombreInvalido && !emailInvalido && !passInvalido && !regionInvalida && !comunaInvalida) {
                alert("¡Registro de usuario exitoso!");
                window.location.href = "login.html";
            }
        });
    }

    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            let nombre = document.getElementById('contact-nombre').value;
            let email = document.getElementById('contact-email').value;
            let mensaje = document.getElementById('contact-mensaje').value;

            let nombreInvalido = nombre.trim() === "";
            let emailInvalido = !esCorreoValido(email);
            let mensajeInvalido = mensaje.trim() === "";

            manejarError('contact-nombre', nombreInvalido);
            manejarError('contact-email', emailInvalido);
            manejarError('contact-mensaje', mensajeInvalido);

            if (!nombreInvalido && !emailInvalido && !mensajeInvalido) {
                alert("¡Mensaje enviado correctamente!");
                formContacto.reset();
            }
        });
    }
});