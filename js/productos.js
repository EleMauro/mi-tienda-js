// productos.js

// 🔹 Obtener todos los productos desde DummyJSON
export async function obtenerProductos(categoria = '') {
  try {
    let url = 'https://dummyjson.com/products';
    if (categoria) {
      // Si pasás una categoría, DummyJSON tiene endpoint para categorías
      url = `https://dummyjson.com/products/category/${categoria}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos');

    const data = await res.json();
    // DummyJSON devuelve { products: [...] }
    return data.products;
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
    return [];
  }
}

// 🔹 Crear la tarjeta de producto
export function crearTarjetaProducto(producto, callbackAgregar) {
  const card = document.createElement('div');
  card.className = 'card';

  // usamos thumbnail como imagen principal
  card.innerHTML = `
    <img src="${producto.thumbnail}" alt="${producto.title}">
    <h3>${producto.title}</h3>
    <p>$${producto.price}</p>
    <button>Agregar al carrito</button>
  `;

  // evento para agregar al carrito
  card.querySelector('button').addEventListener('click', () => {
    callbackAgregar(producto);
  });

  return card;
}

// 🔹 Opcional: Obtener categorías (para filtros)
export async function obtenerCategorias() {
  try {
    const res = await fetch('https://dummyjson.com/products/categories');
    if (!res.ok) throw new Error('Error al obtener categorías');

    return await res.json(); // array de strings
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
    return [];
  }
}
