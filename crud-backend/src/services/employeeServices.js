import { query } from "../db.js"

export const getEmployees = async() => {
  const {rows} = await query('SELECT e.*, p.nombre as puesto, d.nombre as departamento FROM empleados e LEFT JOIN puestos p ON e.puesto_id = p.id LEFT JOIN departamentos d ON p.departamento_id = d.id');
  return rows;
}

export const createEmployee = async(employeeData) => {
  const { nombre, apellido, email, telefono, fecha_contratacion, salario, puesto_id } = employeeData;
  const { rows } = await query(
    'INSERT INTO empleados (nombre, apellido, email, telefono, fecha_contratacion, salario, puesto_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [nombre, apellido, email, telefono, fecha_contratacion, salario, puesto_id]
  );
    
    return rows[0];
}

export const updateEmployee = async (employeeId, employeeData) => {
  const { nombre, apellido, email, telefono, fecha_contratacion, salario, puesto_id } = employeeData;
  const { rows } = await query(
    `UPDATE empleados SET 
      nombre = $1, 
      apellido = $2, 
      email = $3, 
      telefono = $4, 
      fecha_contratacion = $5, 
      salario = $6, 
      puesto_id = $7 
     WHERE id = $8 RETURNING *`,
    [nombre, apellido, email, telefono, fecha_contratacion, salario, puesto_id, employeeId]
  );
    return rows[0];
};

export const deleteEmployee = async (employeeId) => {
    const { rowCount } = await query('DELETE FROM empleados WHERE id = $1', [employeeId]);
    return rowCount > 0;
};

export const searchEmployees = async (searchTerm) => {
  const { rows } = await query(
    `SELECT * FROM empleados 
    WHERE nombre ILIKE $1 
    OR apellido ILIKE $1 
    OR email ILIKE $1 
    OR telefono ILIKE $1`,
    [`%${searchTerm}%`]
  );
  return rows;
};