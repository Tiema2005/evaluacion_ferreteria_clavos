document.addEventListener("DOMContentLoaded", () => {
    // Header
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("components/header.html")
            .then(res => res.text())
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(err => console.error("Error cargando el header:", err));
    }

    // Footer
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("components/footer.html")
            .then(res => res.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(err => console.error("Error cargando el footer:", err));
    }
});

async function cargarComponentes() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    // Cargar Header
    if (headerContainer) {
        try {
            const respHeader = await fetch('header.html'); // Asegúrate de tener este archivo
            if (respHeader.ok) {
                headerContainer.innerHTML = await respHeader.text();
                actualizarContadorCarrito(); // Actualizar contador una vez que el header exista
            }
        } catch (error) {
            console.error("Error cargando el header:", error);
        }
    }

    // Cargar Footer
    if (footerContainer) {
        try {
            const respFooter = await fetch('footer.html'); // Asegúrate de tener este archivo
            if (respFooter.ok) {
                footerContainer.innerHTML = await respFooter.text();
            }
        } catch (error) {
            console.error("Error cargando el footer:", error);
        }
    }
}

// ==========================================
// 2. CATÁLOGO REDUCIDO (20 Productos Clave)
// ==========================================
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

// ==========================================
// 3. CARRITO Y LOCALSTORAGE
// ==========================================
let carrito = JSON.parse(localStorage.getItem('carritoFerret')) || [];

function renderizarCatalogo(productosAMostrar = listaDeProductos) {
    const contenedor = document.getElementById('catalogo-productos');
    if (!contenedor) return;

    contenedor.innerHTML = "";
    
    if (productosAMostrar.length === 0) {
        contenedor.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: gray;'>No se encontraron productos.</p>";
        return;
    }

    productosAMostrar.forEach(prod => {
        contenedor.innerHTML += `
            <article class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.7rem; background: #e2e8f0; padding: 2px 8px; border-radius: 10px; font-weight: 600;">${prod.categoria}</span>
                    <h3 style="font-size: 1rem; margin-top: 10px; margin-bottom: 5px;">${prod.nombre}</h3>
                    <p style="font-size: 0.8rem; color: gray;">Marca: <strong>${prod.marca}</strong> | Unid: ${prod.unidad}</p>
                    <p style="font-size: 0.8rem; color: ${prod.stock <= prod.stockMinimo ? '#d32f2f' : '#2e7d32'}; margin-top: 5px;">Stock: <strong>${prod.stock} ${prod.unidad}</strong></p>
                </div>
                <div style="margin-top: 15px;">
                    <p style="font-size: 1.2rem; font-weight: bold; color: var(--accent-color); margin-bottom: 10px;">$ ${prod.pVenta.toLocaleString('es-CL')}</p>
                    <button class="btn-accent" style="width:100%; padding: 8px;" onclick="agregarAlCarrito('${prod.id}')">Añadir al carrito</button>
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
        contenedor.innerHTML += `
            <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; background: white;">
                <div>
                    <span style="font-size: 0.7rem; background: #e2e8f0; padding: 2px 8px; border-radius: 10px; font-weight: 600;">${prod.categoria}</span>
                    <h3 style="font-size: 1rem; margin-top: 10px; margin-bottom: 5px;">${prod.nombre}</h3>
                    <p style="font-size: 0.8rem; color: gray;">Marca: <strong>${prod.marca}</strong> | Unid: ${prod.unidad}</p>
                    <p style="font-size: 0.8rem; color: ${prod.stock <= prod.stockMinimo ? '#d32f2f' : '#2e7d32'}; margin-top: 5px;">Stock: <strong>${prod.stock} ${prod.unidad}</strong></p>
                </div>
                <div style="margin-top: 15px;">
                    <p style="font-size: 1.2rem; font-weight: bold; color: var(--accent-color); margin-bottom: 10px;">$ ${prod.pVenta.toLocaleString('es-CL')}</p>
                    <button class="btn-accent" style="width:100%; padding: 8px;" onclick="agregarAlCarrito('${prod.id}')">Añadir al carrito</button>
                </div>
            </article>
        `;
    });
}

// ==========================================
// 4. FILTROS DE BÚSQUEDA Y CATEGORÍA
// ==========================================
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

// ==========================================
// 5. FUNCIONES DE CARRITO
// ==========================================
window.agregarAlCarrito = function(id) {
    const producto = listaDeProductos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem('carritoFerret', JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito.`);
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    // Busca botones que tengan la clase btn-primary y contengan la palabra "Cart"
    const cartBotones = document.querySelectorAll('.btn-primary');
    cartBotones.forEach(btn => {
        if (btn.innerHTML.includes('Cart') || btn.innerHTML.includes('🛒')) {
            btn.innerHTML = `🛒 Cart (${carrito.length})`;
        }
    });
}