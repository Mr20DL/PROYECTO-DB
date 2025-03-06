import { query } from "../db.js";

// ==================================================
// CONSULTAS COMPLEJAS (JOINS, SUBCONSULTAS, AGREGACIÓN)
// ==================================================

// 1. Salario promedio por departamento (JOIN + GROUP BY)
export const getSalarioPromedioPorDepartamento = async () => {
  const { rows } = await query(`
    SELECT d.nombre AS departamento, 
           ROUND(AVG(p.salario), 2) AS salario_promedio 
    FROM departamentos d
    JOIN puestos p ON d.id = p.departamento_id
    GROUP BY d.nombre
  `);
  return rows;
};

// 2. Top 5 empleados con más capacitaciones (LEFT JOIN + COUNT)
export const getTopEmpleadosCapacitaciones = async () => {
  const { rows } = await query(`
    SELECT e.nombre, 
           COUNT(ec.capacitacion_id) AS total_capacitaciones 
    FROM empleados e
    LEFT JOIN empleado_capacitacion ec ON e.id = ec.empleado_id
    GROUP BY e.id 
    ORDER BY total_capacitaciones DESC 
    LIMIT 5
  `);
  return rows;
};

// 3. Asistencias incompletas (JOIN + FILTRO NULL)
export const getAsistenciasIncompletas = async () => {
  const { rows } = await query(`
    SELECT e.nombre, 
           a.fecha, 
           a.hora_entrada 
    FROM asistencias a
    JOIN empleados e ON a.empleado_id = e.id
    WHERE a.hora_salida IS NULL
  `);
  return rows;
};

// 4. Vacaciones por estado (GROUP BY + COUNT)
export const getVacacionesPorEstado = async () => {
  const { rows } = await query(`
    SELECT estado, 
           COUNT(*) AS total 
    FROM vacaciones
    GROUP BY estado
  `);
  return rows;
};

// 5. Historial laboral detallado (SUBCONSULTA + JOINS)
export const getHistorialLaboralCompleto = async (empleadoId) => {
  const { rows } = await query(`
    SELECT hl.fecha_cambio,
           p_ant.nombre AS puesto_anterior,
           p_nuevo.nombre AS puesto_nuevo,
           hl.salario_anterior,
           hl.nuevo_salario
    FROM historial_laboral hl
    LEFT JOIN puestos p_ant ON hl.puesto_anterior_id = p_ant.id
    LEFT JOIN puestos p_nuevo ON hl.nuevo_puesto_id = p_nuevo.id
    WHERE hl.empleado_id = $1
    ORDER BY hl.fecha_cambio DESC
  `, [empleadoId]);
  return rows;
};

// 6. Empleados sin capacitaciones (LEFT JOIN + FILTRO NULL)
export const getEmpleadosSinCapacitaciones = async () => {
  const { rows } = await query(`
    SELECT e.id, e.nombre, e.email, p.nombre as puesto 
    FROM empleados e
    LEFT JOIN empleado_capacitacion ec ON e.id = ec.empleado_id
    LEFT JOIN puestos p ON e.puesto_id = p.id
    WHERE ec.capacitacion_id IS NULL
  `);
  return rows;
};

// 7. Total pagos por departamento (JOINS ANIDADOS + SUM)
export const getTotalPagosDepartamento = async () => {
  const { rows } = await query(`
    SELECT d.nombre,
           SUM(n.salario_base + n.bonificaciones) AS total_pagado
    FROM nomina n
    JOIN empleados e ON n.empleado_id = e.id
    JOIN puestos p ON e.puesto_id = p.id
    JOIN departamentos d ON p.departamento_id = d.id
    GROUP BY d.nombre
  `);
  return rows;
};

// 8. Evaluaciones con bajo desempeño (JOIN + FILTRO)
export const getEvaluacionesBajoDesempeno = async () => {
  const { rows } = await query(`
    SELECT e.nombre,
           ev.fecha,
           ev.desempeno
    FROM evaluaciones ev
    JOIN empleados e ON ev.empleado_id = e.id
    WHERE ev.desempeno = 'Bajo'
  `);
  return rows;
};

// 9. Capacitaciones por mes (EXTRACT + GROUP BY)
export const getCapacitacionesPorMes = async () => {
  const { rows } = await query(`
    SELECT EXTRACT(MONTH FROM fecha) AS mes,
           COUNT(*) AS total
    FROM capacitaciones
    GROUP BY mes
    ORDER BY mes
  `);
  return rows;
};

// 10. Empleados con múltiples puestos (SUBCONSULTA + HAVING)
export const getEmpleadosMultiplesPuestos = async () => {
  const { rows } = await query(`
    SELECT e.nombre,
           COUNT(hl.nuevo_puesto_id) AS cambios_puesto
    FROM historial_laboral hl
    JOIN empleados e ON hl.empleado_id = e.id
    GROUP BY e.id
    HAVING COUNT(hl.nuevo_puesto_id) > 1
  `);
  return rows;
};

// ==================================================
// CONSULTAS OPTIMIZADAS (VISTAS/ÍNDICES)
// ==================================================

// 1. Resumen departamental (VISTA)
export const getResumenDepartamentos = async () => {
  const { rows } = await query(`
    SELECT * FROM vista_resumen_departamentos
  `);
  return rows;
};

// 2. Últimas evaluaciones (VISTA)
export const getUltimasEvaluaciones = async () => {
  const { rows } = await query(`
    SELECT * FROM vista_ultimas_evaluaciones
  `);
  return rows;
};

// 3. Búsqueda rápida por email (ÍNDICE)
export const buscarEmpleadoPorEmail = async (email) => {
  const { rows } = await query(`
    SELECT * FROM empleados
    WHERE email ILIKE $1
  `, [`%${email}%`]);
  return rows;
};

// 4. Capacitaciones recientes (ÍNDICE)
export const getCapacitacionesRecientes = async () => {
  const { rows } = await query(`
    SELECT nombre, descripcion, fecha 
    FROM capacitaciones
    WHERE fecha >= CURRENT_DATE - INTERVAL '30 days'
    ORDER BY fecha DESC
  `);
  return rows;
};

// 5. Nóminas por periodo (VISTA)
export const getNominasPeriodo = async (fechaInicio, fechaFin) => {
  const { rows } = await query(`
    SELECT * FROM vista_nominas_periodo
    WHERE fecha_pago BETWEEN $1 AND $2
  `, [fechaInicio, fechaFin]);
  return rows;
};