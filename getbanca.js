export async function handler() {
  try {
    // Aquí luego conectaremos con la DB real
    const dummyData = [
      {
        fecha: "2025-11-05",
        tipo: "Depositar",
        medio: "Tarjeta",
        origen: "Binance",
        destino: "MyInvestor",
        cantidad: 100,
        activo: "EUR",
        valorUSDC: 114.0,
      },
    ];

    return {
      statusCode: 200,
      body: JSON.stringify(dummyData),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}