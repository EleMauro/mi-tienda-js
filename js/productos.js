

// OBTENER PROD
export async function obtenerProductos(categoria = '') {
  try {
    let url = 'https://dummyjson.com/products';
    if (categoria) {
      url = `https://dummyjson.com/products/category/${categoria}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos');

    const data = await res.json();
    return data.products;
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
    return [];
  }
}

//  TARJETA PROD
export function crearTarjetaProducto(producto, callbackAgregar) {
  const card = document.createElement('div');
  card.className = 'card';

  // IMG
  card.innerHTML = `
    <img src="${producto.thumbnail}" alt="${producto.title}">
    <h3>${producto.title}</h3>
    <p>$${producto.price}</p>
    <button>Agregar al carrito</button>
  `;

  // + CARRITO
  card.querySelector('button').addEventListener('click', () => {
    callbackAgregar(producto);
  });

  return card;
}

// 🔹FILTROS
export async function obtenerCategorias() {
  try {
    const res = await fetch('https://dummyjson.com/products/categories');
    if (!res.ok) throw new Error('Error al obtener categorías');

    return await res.json();
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
    return [];
  }
}
