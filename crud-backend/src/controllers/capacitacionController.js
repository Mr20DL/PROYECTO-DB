import * as capacitacionService from "../services/capacitacionServices.js";

export const getCapacitacionesByEmpleado = async (req, res) => {
  try {
    const empleadoId = req.params.empleadoId;
    const capacitaciones = await capacitacionService.getCapacitaciones(empleadoId);
    res.status(200).json(capacitaciones);
  } catch (err) {
    console.error('Error fetching capacitaciones:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createCapacitacion = async (req, res) => {
  try {
    const { empleadoId, ...capacitacionData } = req.body;
    const nuevaCapacitacion = await capacitacionService.createCapacitacion(capacitacionData, empleadoId);
    res.status(201).json(nuevaCapacitacion);
  } catch (err) {
    console.error('Error creating capacitacion:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};