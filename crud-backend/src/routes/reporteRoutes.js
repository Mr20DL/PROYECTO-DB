import express from "express";
import * as reporteController from "../controllers/reporteController.js";

const router = express.Router();

// ==================================================
// Rutas para Consultas Complejas
// ==================================================

// Salario promedio por departamento
router.get("/salario-promedio", reporteController.getSalarioPromedio);

// Top 5 empleados con más capacitaciones
router.get("/top-capacitaciones", reporteController.getTopCapacitaciones);

// Asistencias sin hora de salida
router.get("/asistencias-incompletas", reporteController.getAsistenciasPendientes);

// Vacaciones agrupadas por estado
router.get("/vacaciones-estado", reporteController.getEstadosVacaciones);

// Historial laboral de un empleado específico
router.get("/historial-laboral/:empleadoId", reporteController.getHistorialEmpleado);

// Empleados sin capacitaciones
router.get("/empleados-sin-capacitaciones", reporteController.getEmpleadosSinCapacitaciones);

// Total pagado por departamento
router.get("/pagos-departamentos", reporteController.getPagosDepartamentos);

// Evaluaciones con bajo desempeño
router.get("/bajo-desempeno", reporteController.getBajoDesempeno);

// Capacitaciones por mes
router.get("/capacitaciones-mensuales", reporteController.getCapacitacionesMensuales);

// Empleados con múltiples cambios de puesto
router.get("/empleados-multiples-puestos", reporteController.getEmpleadosMultiplesPuestos);

// ==================================================
// Rutas para Consultas Optimizadas
// ==================================================

// Resumen departamental (usa vista)
router.get("/resumen-departamental", reporteController.getResumenDepartamental);

// Evaluaciones recientes (usa vista)
router.get("/evaluaciones-recientes", reporteController.getEvaluacionesRecientes);

// Búsqueda rápida por email (usa índice)
router.get("/buscar-email", reporteController.buscarEmpleadoEmail);

// Capacitaciones últimos 30 días (usa índice)
router.get("/capacitaciones-recientes", reporteController.getCapacitacionesRecientes);

// Nóminas por periodo (usa vista)
router.get("/nominas-periodo", reporteController.getNominasPorPeriodo);

export default router;