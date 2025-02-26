import * as puestoService from "../services/puestoServices.js";

export const getPuestos = async (req, res) => {
    try {
        const puestos = await puestoService.getPuestos();
        res.status(200).json(puestos);
    } catch (err) {
        console.error('Error fetching puestos:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};