import { obtenerProductos, crearTarjetaProducto, obtenerCategorias } from './productos.js';
import { confirmarAgregarProducto } from './notificaciones.js';
import { agregarAlCarrito } from './carrito.js';

document.addEventListener('DOMContentLoaded', async () => {
  const output = document.getElementById('output');
  
  // 🔹 cargar productos iniciales
  const productos = await obtenerProductos();

  let productosMostrados = 0;
  const cantidadPorPagina = 10;

  function renderProductos() {
    const fin = productosMostrados + cantidadPorPagina;
    const subset = productos.slice(productosMostrados, fin);

    subset.forEach(producto => {
      const card = crearTarjetaProducto(producto, async (prod) => {
        const res = await confirmarAgregarProducto(prod);
        if (res.isConfirmed) {
          agregarAlCarrito(prod);
        }
      });
      output.appendChild(card);
    });

    productosMostrados = fin;

    if (productosMostrados >= productos.length) {
      verMasBtn.style.display = 'none';
    }
  }

  // 🔹 botón “Ver más”
  const verMasBtn = document.createElement('button');
  verMasBtn.id = 'ver-mas';
  verMasBtn.textContent = 'Ver más';
  verMasBtn.addEventListener('click', renderProductos);
  output.after(verMasBtn);

  renderProductos();

  // 🔹 opcional: cargar categorías para un select
  const categorias = await obtenerCategorias();
  console.log('Categorías disponibles:', categorias);
});

