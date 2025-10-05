export function confirmarAgregarProducto(producto) {
  return Swal.fire({
    title: '¿Agregar al carrito?',
    text: producto.title,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  });
}

export function toastExito(mensaje) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  });
}
