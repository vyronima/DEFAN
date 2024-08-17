// Inventarios iniciales
let bodega1 = 100000;
let bodega2 = 230000;
let totalVentasBodega1 = 0;
let totalVentasBodega2 = 0;

function makeSale() {
    const amount = parseFloat(document.getElementById('amount').value);
    const unit = document.getElementById('unit').value;
    const warehouse = document.getElementById('warehouse').value;

    let amountInKilos;

    // Convertir la cantidad a kilos
    switch (unit) {
        case 'kilos':
            amountInKilos = amount;
            break;
        case 'libras':
            amountInKilos = amount * 0.4536;
            break;
        case 'gramos':
            amountInKilos = amount * 0.001;
            break;
    }

    // Determinar la bodega seleccionada
    let inventory;
    let totalVentas;

    if (warehouse === 'bodega1') {
        inventory = bodega1;
        totalVentas = totalVentasBodega1;
    } else {
        inventory = bodega2;
        totalVentas = totalVentasBodega2;
    }

    // Verificar si hay suficiente inventario
    if (amountInKilos > inventory) {
        alert("No hay suficiente inventario en la bodega seleccionada.");
        return;
    }

    // Descontar del inventario
    inventory -= amountInKilos;

    // Actualizar las ventas totales
    totalVentas += amountInKilos;

    // Actualizar el inventario en la bodega correspondiente
    if (warehouse === 'bodega1') {
        bodega1 = inventory;
        totalVentasBodega1 = totalVentas;
    } else {
        bodega2 = inventory;
        totalVentasBodega2 = totalVentas;
    }

    // Verificar si el inventario está en los niveles críticos
    const mitadInventario = 0.5 * (warehouse === 'bodega1' ? 100000 : 230000);
    const diezPorcientoInventario = 0.1 * (warehouse === 'bodega1' ? 100000 : 230000);

    let messages = "";

    if (inventory <= mitadInventario) {
        messages += `<p class="text-warning">Advertencia: El inventario en ${warehouse} ha llegado a la mitad.</p>`;
    }

    if (inventory <= diezPorcientoInventario) {
        messages += `<p class="text-danger">Advertencia: El inventario en ${warehouse} está por agotarse (10% restante).</p>`;
    }

    // Mostrar los resultados
    document.getElementById('results').innerHTML = `
        <h2>Resultados de la Venta</h2>
        <p>Inventario restante en ${warehouse}: ${inventory.toFixed(2)} kilos</p>
        ${messages}
    `;

    // Actualizar la tabla de resumen de ventas
    document.getElementById('total-sales-bodega1').innerText = totalVentasBodega1.toFixed(2);
    document.getElementById('total-sales-bodega2').innerText = totalVentasBodega2.toFixed(2);
}
