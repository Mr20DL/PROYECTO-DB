import './App.css'
import NavBar from './components/NavBar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'
import Reportes from './components/Reportes';
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [vistaActual, setVistaActual] = useState('empleados');

  const fetchEmployees = async () => {
    try {
      const response  = await axios.get('http://localhost:3000/api/employees')
      setTableData(response.data); // Set the fetched data

    } catch (err) {
        setError(err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  const handleOpen = (mode, employee) => {
    setEmployeeData(employee);
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmit = async (newEmployeeData) =>{
    if (modalMode === 'add'){
      try {
        const response = await axios.post('http://localhost:3000/api/employees', newEmployeeData); // Replace with your actual API URL
        console.log('Employee added:', response.data); // Log the response
        setTableData((prevData) => [...prevData, response.data]);
        // Optionally, update your state here to reflect the newly added employee
        } catch (error) {
            console.error('Error adding employee:', error); // Log any errors
        }
      console.log('modal mode Add');
    } else {
      console.log('Updating employee with ID:', employeeData.id); // Log the ID being updated
        try{
          const response = await axios.put(`http://localhost:3000/api/employees/${employeeData.id}`, newEmployeeData);
                console.log('Employee updated:', response.data);
                setTableData((prevData) =>
                  prevData.map((employee) => (employee.id === employeeData.id ? response.data : employee))
                );
        } catch (error){
          console.error('Error updating employee:', error); 
        }
    }
  }

  return (
    <>
      <NavBar
        onOpen={() => handleOpen('add')}
        onSearch={setSearchTerm}
        onViewChange={setVistaActual}
      />

      {vistaActual === 'empleados' ? (
        <>
          <TableList
            setTableData={setTableData}
            tableData={tableData}
            handleOpen={handleOpen}
            searchTerm={searchTerm}
            onShowCapacitaciones={setSelectedEmployeeId}
          />
          <ModalForm
            isOpen={isOpen}
            OnSubmit={handleSubmit}
            onClose={() => setIsOpen(false)}
            mode={modalMode}
            employeeData={employeeData}
          />
          {selectedEmployeeId && (
            <EmployeeCapacitaciones
              empleadoId={selectedEmployeeId}
              onClose={() => setSelectedEmployeeId(null)}
            />
          )}
        </>
      ) : (
        <Reportes />
      )}
    </>
  );
}

export default App