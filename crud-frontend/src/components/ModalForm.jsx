import { useState, useEffect} from "react"
import axios from "axios";

export default function ModalForm({isOpen, onClose, mode, OnSubmit, employeeData}){
    
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaContratacion, setFechaContratacion] = useState('');
    const [salario, setSalario] = useState('');
    const [puestoId, setPuestoId] = useState('');
    const [puestos, setPuestos] = useState([]);

    // Obtener puestos al abrir el modal
    useEffect(() => {
        const fetchPuestos = async () => {
            const response = await axios.get('http://localhost:3000/api/puestos');
            setPuestos(response.data);
        };
        fetchPuestos();
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeData = {nombre, apellido, email, telefono , fecha_contratacion: fechaContratacion, salario: Number(salario), puesto_id: Number(puestoId)};
            await OnSubmit(employeeData);
            onClose();
        } catch (err) {
            console.error("Error adding employee" , err);
        }
    }

    return(
        <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
            <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Employee' : 'Employee Details'}</h3>
            <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <label className="input input-bordered my-4 flex items-center gap-2">
                Nombre
                <input type="text" className="grow" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
                Apellido
                <input type="text" className="grow" value={apellido} onChange={(e) => setApellido(e.target.value)}/>
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
                Email
                <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
                Teléfono
                <input type="text" className="grow" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
                Fecha Contratación *
                <input type="date" value={fechaContratacion} onChange={(e) => setFechaContratacion(e.target.value)}/>
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
                Salario *
                <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} placeholder="Ej: 150000" step={"0.01"}/>
            </label>
            <div className="flex mb-4 justify-between my-4">
                <select 
                    className="select select-bordered w-full mt-4"
                    value={puestoId} 
                    onChange={(e) => setPuestoId(e.target.value)}
                    required
                >
                    <option value="">Seleccionar puesto *</option>
                    {puestos.map(puesto => (
                        <option key={puesto.id} value={puesto.id}>
                            {puesto.nombre} ({puesto.departamento})
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
            <button className="btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Employee'}</button>
            </form>
        </div>
        </dialog>
        </>
    )
}