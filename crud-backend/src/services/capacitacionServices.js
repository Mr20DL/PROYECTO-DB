import { query, getClient } from "../db.js";

export const getCapacitaciones = async (empleadoId) => {
  const { rows } = await query(`
    SELECT c.* FROM capacitaciones c
    JOIN empleado_capacitacion ec ON c.id = ec.capacitacion_id
    WHERE ec.empleado_id = $1
  `, [empleadoId]);
  return rows;
};

export const createCapacitacion = async (capacitacionData, empleadoId) => {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    
    const insertCapacitacion = await client.query(
      'INSERT INTO capacitaciones (nombre, descripcion, fecha) VALUES ($1, $2, $3) RETURNING *',
      [capacitacionData.nombre, capacitacionData.descripcion, capacitacionData.fecha]
    );
    
    await client.query(
      'INSERT INTO empleado_capacitacion (empleado_id, capacitacion_id) VALUES ($1, $2)',
      [empleadoId, insertCapacitacion.rows[0].id]
    );
    
    await client.query('COMMIT');
    return insertCapacitacion.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};