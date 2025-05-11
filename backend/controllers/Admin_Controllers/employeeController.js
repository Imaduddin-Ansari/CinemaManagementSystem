const EmployeeAdmin = require('../../models/AdminModel/Movie');  // Change to EmployeeAdmin

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const employee = new EmployeeAdmin(req.body);  // Changed Employee to EmployeeAdmin
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add employee', error: err.message });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeAdmin.find();  // Changed Employee to EmployeeAdmin
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEmployee = await EmployeeAdmin.findByIdAndUpdate(id, req.body, { new: true });  // Changed Employee to EmployeeAdmin
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update employee', error: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await EmployeeAdmin.findByIdAndDelete(id);  // Changed Employee to EmployeeAdmin
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete employee', error: err.message });
  }
};
