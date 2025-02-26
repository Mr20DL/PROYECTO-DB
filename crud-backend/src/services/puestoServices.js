import { query } from "../db.js";

export const getPuestos = async () => {
    const { rows } = await query(`
        SELECT p.id, p.nombre, p.salario, d.nombre as departamento 
        FROM puestos p
        JOIN departamentos d ON p.departamento_id = d.id
    `);
    return rows;
};