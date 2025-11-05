export async function handler() {
  try {
    // Aquí conectaríamos con Google Drive API
    const message = "Exportación a Drive programada correctamente";

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}