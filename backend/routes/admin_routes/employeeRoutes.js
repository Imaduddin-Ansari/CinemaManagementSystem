const express = require('express');
const { addEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../../controllers/Admin_Controllers/employeeController');
const router = express.Router();

router.post('/', addEmployee);
router.get('/', getAllEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
