const nombreProducto = document.getElementById('nombre-producto');
const precioProducto = document.getElementById('precio-producto');
const descuentoProducto = document.getElementById('descuento-producto');
const agregarProductoBtn = document.getElementById('agregar-producto');
const limpiarProductosBtn = document.getElementById('limpiar-productos');
const tablaProductos = document.getElementById('cuerpo-tabla-productos');
const totalProductosElement = document.getElementById('total-productos');

let productos = [];

function calcularTotal(precio, descuento) {
  const descuentoValor = precio * (descuento / 100);
  return precio - descuentoValor;
}

function agregarProducto() {
  const nombre = nombreProducto.value;
  const precio = parseFloat(precioProducto.value);
  const descuento = parseFloat(descuentoProducto.value);
  const total = calcularTotal(precio, descuento);

  if (nombre.trim() === '' || isNaN(precio) || isNaN(descuento)) {
    alert('Por favor, llena todos los campos correctamente.');
    return;
  }

  const producto = { nombre, precio, descuento, total };
  productos.push(producto);
  actualizarTabla();
  actualizarTotalProductos();

  nombreProducto.value = '';
  precioProducto.value = '';
  descuentoProducto.value = '';
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  actualizarTabla();
  actualizarTotalProductos();
}

function actualizarTabla() {
  tablaProductos.innerHTML = '';

  productos.forEach((producto, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.precio.toFixed(0)}</td>
      <td>${producto.descuento}%</td>
      <td>${producto.total.toFixed(0)}</td>
      <td>
        <button type="button" class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    tablaProductos.appendChild(fila);
  });
}

function limpiarProductos() {
  productos = [];
  actualizarTabla();
  actualizarTotalProductos();
}

function actualizarTotalProductos() {
  const totalProductos = productos.reduce((total, producto) => total + producto.total, 0);
  totalProductosElement.textContent = `Total: $${totalProductos.toFixed(0)}`;
}

agregarProductoBtn.addEventListener('click', agregarProducto);
limpiarProductosBtn.addEventListener('click', limpiarProductos);