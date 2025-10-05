// carrito.js

// Estado del carrito (lo inicializamos desde localStorage si existe)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto y refrescar UI
export function agregarAlCarrito(producto) {
  carrito.push(producto);
  guardarCarrito();
  renderizarCarrito();
}

// Render de la lista + resumen (cantidad y total)
function renderizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const resumen = document.getElementById('resumen-carrito');

  lista.innerHTML = '';

  let total = 0;

  carrito.forEach((prod, index) => {
    total += prod.price;

    const li = document.createElement('li');
    li.className = 'item-carrito';

    // miniatura
    const img = document.createElement('img');
    img.src = prod.thumbnail;
    img.alt = prod.title;
    img.style.width = '30px';
    img.style.height = '30px';
    img.style.objectFit = 'cover';
    img.style.marginRight = '5px';

    const info = document.createElement('span');
    info.textContent = `${prod.title} - $${prod.price}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar-item';
    btnEliminar.textContent = '❌';
    btnEliminar.title = 'Eliminar este producto';
    btnEliminar.addEventListener('click', () => {
      eliminarDelCarrito(index);
    });

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  resumen.textContent = `${carrito.length} ítems — Total: $${total.toFixed(2)}`;
}

// Eliminar un ítem por índice y refrescar
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  guardarCarrito();
  renderizarCarrito();
}

// Botón "Vaciar carrito"
const btnVaciar = document.getElementById('vaciar-carrito');
if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  });
}

// Render inicial (en caso de que haya datos en localStorage)
document.addEventListener('DOMContentLoaded', renderizarCarrito);
