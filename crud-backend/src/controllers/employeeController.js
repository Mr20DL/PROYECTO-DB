import * as employeeService from "../services/employeeServices.js";

export const getEmployees = async (req, res) => {
    try {
        const employee = await employeeService.getEmployees();
        res.status(200).json(employee);
    } catch (err) { 
        console.error('Error fetching employee:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const employeeData = req.body;
        const newEmployee = await employeeService.createEmployee(employeeData);
        res.status(200).json(newEmployee);
    } catch (err) { 
        console.error('Error adding employee:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeData = req.body;
        const updatedEmployee = await employeeService.updateEmployee(employeeId, employeeData);
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);

    } catch (err) { 
        console.error('Error updating employee:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deleted = await employeeService.deleteEmployee(employeeId);
        if (!deleted) {
        return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).send();

    } catch (err) { 
        console.error('Error deleting employee:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchEmployees = async (req, res) => {
    try {
      const searchTerm = req.query.q; // Get the search term from the query parameters
      const employees = await employeeService.searchEmployees(searchTerm);
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error searching employees:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };