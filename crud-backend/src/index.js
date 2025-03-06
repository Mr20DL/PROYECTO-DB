import express from 'express';
import cors from 'cors';
import employeeRoutes from "./routes/employeeRoutes.js";
import puestoRoutes from "./routes/puestoRoutes.js";
import capacitacionRoutes from "./routes/capacitacionRoutes.js";
import reporteRoutes from "./routes/reporteRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', employeeRoutes);
app.use('/api', puestoRoutes);
app.use('/api', capacitacionRoutes);
app.use('/api/reportes', reporteRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint no encontrado" });
  });

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});