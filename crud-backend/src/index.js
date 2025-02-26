import express from 'express';
import cors from 'cors';
import employeeRoutes from "./routes/employeeRoutes.js";
import puestoRoutes from "./routes/puestoRoutes.js";
import capacitacionRoutes from "./routes/capacitacionRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', employeeRoutes);
app.use('/api', puestoRoutes);
app.use('/api', capacitacionRoutes);

app.listen(port, () => {
    console.log("listening on port 3000")
});