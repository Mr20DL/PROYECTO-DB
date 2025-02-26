import express from 'express';
import * as capacitacionController from '../controllers/capacitacionController.js';

const router = express.Router();
router.get('/empleados/:empleadoId/capacitaciones', capacitacionController.getCapacitacionesByEmpleado);
router.post('/capacitaciones', capacitacionController.createCapacitacion);

export default router;