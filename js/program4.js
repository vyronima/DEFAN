function calculateLoan() {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const term = parseInt(document.getElementById('loan-term').value);
    const creditType = document.getElementById('credit-type').value;

    let interestRate;

    if (creditType === 'libre_inversion') {
        interestRate = 2.5;
    } else if (creditType === 'libranza') {
        interestRate = 2.9;
    }

    // Aplicar descuentos según el número de cuotas
    if (term < 6) {
        interestRate -= 0.2;
    } else if (term >= 12 && term < 24) {
        interestRate -= 0.4;
    } else if (term >= 24) {
        interestRate -= 0.7;
    }

    // Convertir tasa de interés a decimal
    const monthlyInterestRate = interestRate / 100;

    // Calcular el valor de la cuota mensual usando la fórmula de amortización
    const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -term));

    // Formatear los números como pesos colombianos
    const formattedAmount = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    const formattedMonthlyPayment = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monthlyPayment);

    // Mostrar los resultados
    document.getElementById('results').innerHTML = `
        <h2>Resultados del Crédito</h2>
        <p>Valor del Préstamo: ${formattedAmount}</p>
        <p>Número de Cuotas: ${term}</p>
        <p>Tasa de Interés: ${interestRate.toFixed(2)}% mensual</p>
        <p>Valor de la Cuota: ${formattedMonthlyPayment}</p>
    `;
}
