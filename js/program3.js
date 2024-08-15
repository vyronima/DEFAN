document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cobroForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const estrato = parseInt(document.getElementById("estrato").value);
        const metrosCubicosConsumidos = parseFloat(document.getElementById("metros").value);

        const totalPagar = calcularTotalPagar(estrato, metrosCubicosConsumidos);
        
        document.getElementById("totalPagar").textContent = `Total a pagar: $${totalPagar}`;
    });
});

function calcularTotalPagar(estrato, metrosCubicosConsumidos) {
    const cargoFijo = 5800;
    let tarifaPorMetroCubico;

    // Determinar la tarifa según el estrato
    switch (estrato) {
        case 1:
            tarifaPorMetroCubico = 1200;
            break;
        case 2:
            tarifaPorMetroCubico = 2300;
            break;
        case 3:
            tarifaPorMetroCubico = 3200;
            break;
        default:
            console.error("Estrato no válido");
            return;
    }

    // Calcular el costo del consumo
    let costoConsumo = metrosCubicosConsumidos * tarifaPorMetroCubico;

    // Aplicar recargo si el consumo supera los 20 metros cúbicos
    if (metrosCubicosConsumidos > 20) {
        costoConsumo *= 1.10; // Recargo del 10%
    }

    // Calcular el total a pagar
    const totalPagar = costoConsumo + cargoFijo;

    return totalPagar;
}
