export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    if (!body || !body.fecha) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Falta el campo 'fecha'." }),
      };
    }

    // Simulación: guardamos en base Netlify env
    const record = {
      id: Banca-${Date.now()},
      fecha: body.fecha,
      tipo: body.tipo,
      medio: body.medio,
      origen: body.origen,
      destino: body.destino,
      cantidad: body.cantidad,
      activo: body.activo,
      valorUSDC: body.valorUSDC,
      notas: body.notas || "",
      timestamp: new Date().toISOString(),
    };

    // Guarda en KV o base temporal (aquí simulamos persistencia)
    console.log("Guardado registro:", record);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: record }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}