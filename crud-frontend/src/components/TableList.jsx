import axios from 'axios';
import { useState } from 'react';
import EmployeeCapacitaciones from './EmployeeCapacitaciones';


export default function TableList({handleOpen, tableData, setTableData , searchTerm}){
    const [error, setError] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);


    // Filter the tableData based on the searchTerm
    const filteredData = tableData.filter(employee => 
        employee.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.puesto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/employees/${id}`); // API call to delete employee
                setTableData((prevData) => prevData.filter(employee => employee.id !== id)); // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };

    return(
        <>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Fecha Contratación</th>
                        <th>Salario</th>
                        <th>Puesto</th>
                    </tr>
                    </thead>
                    <tbody className="hover">
                    {/* row 1 */}

                    {filteredData.map((employee) => (
                        <tr key={employee.id}>
                            <th>{employee.id}</th>
                            <td>{employee.nombre}</td>
                            <td>{employee.apellido}</td>
                            <td>{employee.email}</td>
                            <td>{employee.telefono}</td>
                            <td>{new Date(employee.fecha_contratacion).toLocaleDateString()}</td>
                            <td>${employee.salario?.toLocaleString()}</td>
                            <td>{employee.puesto} ({employee.departamento})</td>
                            <td>
                            <button onClick={() => setSelectedEmployeeId(employee.id)} className="btn btn-info ml-2">Capacitaciones</button>
                            <button onClick={() => handleOpen('edit', employee)} className="btn btn-secondary ml-2">Editar</button>
                            <button className="btn btn-accent ml-2" onClick={() => handleDelete(employee.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {selectedEmployeeId && (
                <EmployeeCapacitaciones
                    empleadoId={selectedEmployeeId}
                    onClose={() => setSelectedEmployeeId(null)}
                />
            )}
        </>
    )
}