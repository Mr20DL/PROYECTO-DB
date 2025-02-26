import express from 'express';
import * as puestoController from '../controllers/puestoController.js';

const router = express.Router();
router.get('/puestos', puestoController.getPuestos);

export default router;