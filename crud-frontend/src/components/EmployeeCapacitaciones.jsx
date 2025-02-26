import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeCapacitaciones({ empleadoId, onClose }) {
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [newCapacitacion, setNewCapacitacion] = useState({
    nombre: '',
    descripcion: '',
    fecha: ''
  });

  useEffect(() => {
    const fetchCapacitaciones = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/empleados/${empleadoId}/capacitaciones`
        );
        setCapacitaciones(response.data);
      } catch (error) {
        console.error('Error fetching capacitaciones:', error);
      }
    };
    
    if (empleadoId) fetchCapacitaciones();
  }, [empleadoId]);

  const handleAddCapacitacion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/capacitaciones`, {
        ...newCapacitacion,
        empleadoId // Debe enviarse como parámetro separado
      });
      const updated = await axios.get(
        `http://localhost:3000/api/empleados/${empleadoId}/capacitaciones`
      );
      setCapacitaciones(updated.data);
      setNewCapacitacion({ nombre: '', descripcion: '', fecha: '' });
    } catch (error) {
      console.error('Error adding capacitacion:', error);
    }
  };

  return (
    <dialog className="modal" open={!!empleadoId}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Capacitaciones del Empleado</h3>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        
        <div className="overflow-x-auto mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {capacitaciones.map((cap) => (
                <tr key={cap.id}>
                  <td>{cap.nombre}</td>
                  <td>{cap.descripcion}</td>
                  <td>{new Date(cap.fecha).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleAddCapacitacion} className="mt-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nombre"
              className="input input-bordered"
              value={newCapacitacion.nombre}
              onChange={(e) => setNewCapacitacion({...newCapacitacion, nombre: e.target.value})}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="input input-bordered"
              value={newCapacitacion.descripcion}
              onChange={(e) => setNewCapacitacion({...newCapacitacion, descripcion: e.target.value})}
            />
            <input
              type="date"
              className="input input-bordered"
              value={newCapacitacion.fecha}
              onChange={(e) => setNewCapacitacion({...newCapacitacion, fecha: e.target.value})}
            />
            <button type="submit" className="btn btn-primary">
              Agregar Capacitación
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}