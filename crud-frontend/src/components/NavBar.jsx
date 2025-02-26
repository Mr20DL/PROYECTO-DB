export default function NavBar({onOpen, onSearch}){

    const handleSearchChange = (event) => {
        onSearch(event.target.value); // Call the onSearch callback with the input value
    };

    return(
        <>
        <div className="navbar bg-base-100 shadow-sm p-4">
        <div className="navbar-start">
            <a className="btn btn-ghost text-xl">Employees</a>
        </div>
        <div className="navbar-center">
            <div className="form-control">
            <input type="text" placeholder="Buscar empleado..." onChange={handleSearchChange} className="input input-bordered w-48 md:w-auto" />
            </div>
        </div>
        <div className="navbar-end">
            <a className="btn btn-primary" onClick={onOpen}>Add Employee</a>
        </div>
        </div>
        </>
    )
}