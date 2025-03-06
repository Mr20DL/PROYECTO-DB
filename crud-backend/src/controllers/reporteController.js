import * as reporteService from "../services/reporteServices.js";

// ==================================================
// Controladores para Consultas Complejas
// ==================================================

export const getSalarioPromedio = async (req, res) => {
  try {
    const data = await reporteService.getSalarioPromedioPorDepartamento();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al calcular salarios", error: err.message });
  }
};

export const getTopCapacitaciones = async (req, res) => {
  try {
    const data = await reporteService.getTopEmpleadosCapacitaciones();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener capacitaciones", error: err.message });
  }
};

export const getAsistenciasPendientes = async (req, res) => {
  try {
    const data = await reporteService.getAsistenciasIncompletas();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener asistencias", error: err.message });
  }
};

export const getEstadosVacaciones = async (req, res) => {
  try {
    const data = await reporteService.getVacacionesPorEstado();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener vacaciones", error: err.message });
  }
};

export const getHistorialEmpleado = async (req, res) => {
  try {
    const { empleadoId } = req.params;
    const data = await reporteService.getHistorialLaboralCompleto(empleadoId);
    data.length === 0 
      ? res.status(404).json({ message: "No se encontró historial" })
      : res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener historial", error: err.message });
  }
};

export const getEmpleadosSinCapacitaciones = async (req, res) => {
  try {
    const data = await reporteService.getEmpleadosSinCapacitaciones();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener empleados", error: err.message });
  }
};

export const getPagosDepartamentos = async (req, res) => {
  try {
    const data = await reporteService.getTotalPagosDepartamento();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al calcular pagos", error: err.message });
  }
};

export const getBajoDesempeno = async (req, res) => {
  try {
    const data = await reporteService.getEvaluacionesBajoDesempeno();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener evaluaciones", error: err.message });
  }
};

export const getCapacitacionesMensuales = async (req, res) => {
  try {
    const data = await reporteService.getCapacitacionesPorMes();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener capacitaciones", error: err.message });
  }
};

export const getEmpleadosMultiplesPuestos = async (req, res) => {
  try {
    const data = await reporteService.getEmpleadosMultiplesPuestos();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener empleados", error: err.message });
  }
};

// ==================================================
// Controladores para Consultas Optimizadas
// ==================================================

export const getResumenDepartamental = async (req, res) => {
  try {
    const data = await reporteService.getResumenDepartamentos();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener resumen", error: err.message });
  }
};

export const getEvaluacionesRecientes = async (req, res) => {
  try {
    const data = await reporteService.getUltimasEvaluaciones();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener evaluaciones", error: err.message });
  }
};

export const buscarEmpleadoEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const data = await reporteService.buscarEmpleadoPorEmail(email);
    data.length === 0 
      ? res.status(404).json({ message: "Empleado no encontrado" })
      : res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error en la búsqueda", error: err.message });
  }
};

export const getCapacitacionesRecientes = async (req, res) => {
  try {
    const data = await reporteService.getCapacitacionesRecientes();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener capacitaciones", error: err.message });
  }
};

export const getNominasPorPeriodo = async (req, res) => {
  try {
    const { inicio, fin } = req.query;
    const data = await reporteService.getNominasPeriodo(inicio, fin);
    data.length === 0 
      ? res.status(404).json({ message: "No hay nóminas en este periodo" })
      : res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener nóminas", error: err.message });
  }
};