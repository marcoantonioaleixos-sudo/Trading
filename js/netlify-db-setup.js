import { db } from '@netlify/sdk'

async function setup() {
  // ✅ Crea o actualiza el enum "tipo_enum"
  await db.enums.createOrUpdate('tipo_enum', {
    values: ['Depositar', 'Retirar'],
  });

  // ✅ Actualiza la tabla movimientos para usar ese enum
  await db.tables.update('movimientos', {
    columns: {
      tipo: {
        type: 'Enum',
        enum: 'tipo_enum',
        default: 'Depositar',
      },
    },
  });

  console.log('Enum "tipo_enum" creado y asignado al campo "tipo" de movimientos.');
}

setup().catch(console.error);
