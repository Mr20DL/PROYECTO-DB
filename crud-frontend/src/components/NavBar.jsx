export default function NavBar({onOpen, onSearch, onViewChange}){

    const handleSearchChange = (event) => {
        onSearch(event.target.value); // Call the onSearch callback with the input value
    };

    return(
        <>
        <div className="navbar bg-base-100 shadow-sm p-4">
        <div className="navbar-start">
            <a className="btn btn-ghost text-xl" onClick={() => onViewChange('empleados')}>Empleados</a>
            <a className="btn btn-ghost text-xl ml-2" onClick={() => onViewChange('reportes')}>Reportes</a>
        </div>
        <div className="navbar-center">
            <div className="form-control">
            <input type="text" placeholder="Buscar empleado..." onChange={handleSearchChange} className="input input-bordered w-48 md:w-auto" />
            </div>
        </div>
        <div className="navbar-end">
            <a className="btn btn-primary" onClick={onOpen}>Añadir Empleado</a>
        </div>
        </div>
        </>
    )
}