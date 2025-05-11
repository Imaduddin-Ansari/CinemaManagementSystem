const Shift = require('../../models/Shift');
const mongoose = require('mongoose');

/**
 * View all assigned shifts for the authenticated employee.
 */
const getAssignedShifts = async (req, res) => {
  try {
    const employeeId = req.user.id; // Assuming req.user contains the authenticated employee's data

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const assignedShifts = await Shift.find({ employeeId })
      .sort({ date: 1 }) // Sort shifts by date
      .populate('employeeId', 'name email'); // Populate employee details if needed

    res.status(200).json({ shifts: assignedShifts });
  } catch (error) {
    console.error('Error fetching assigned shifts:', error);
    res.status(500).json({ error: 'Failed to fetch assigned shifts.' });
  }
};

/**
 * Request a change of schedule for a specific shift.
 */
const requestShiftChange = async (req, res) => {
  try {
    const employeeId = req.user.id; // Authenticated employee
    const { shiftId, requestedShift } = req.body;

    if (!mongoose.Types.ObjectId.isValid(shiftId)) {
      return res.status(400).json({ error: 'Invalid shift ID' });
    }

    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({ error: 'Shift not found.' });
    }

    // Ensure the employee is requesting their own shift
    if (shift.employeeId.toString() !== employeeId) {
      return res.status(403).json({ error: 'You are not authorized to request changes for this shift.' });
    }

    // Validate the requested shift type
    const validShifts = ['morning', 'afternoon', 'evening'];
    if (!validShifts.includes(requestedShift)) {
      return res.status(400).json({ error: `Invalid shift type. Allowed values: ${validShifts.join(', ')}` });
    }

    // Update the shift with the change request details
    shift.status = 'requested';
    shift.requestDetails = {
      requestedBy: employeeId,
      requestedShift,
      requestDate: new Date(),
    };

    await shift.save();

    res.status(200).json({ message: 'Shift change request submitted successfully.', shift });
  } catch (error) {
    console.error('Error requesting shift change:', error);
    res.status(500).json({ error: 'Failed to request shift change.' });
  }
};

/**
 * View a specific shift's details.
 */
const getShiftDetails = async (req, res) => {
  try {
    const { shiftId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shiftId)) {
      return res.status(400).json({ error: 'Invalid shift ID' });
    }

    const shift = await Shift.findById(shiftId)
      .populate('employeeId', 'name email');

    if (!shift) {
      return res.status(404).json({ error: 'Shift not found.' });
    }

    res.status(200).json({ shift });
  } catch (error) {
    console.error('Error fetching shift details:', error);
    res.status(500).json({ error: 'Failed to fetch shift details.' });
  }
};

module.exports = {
  getAssignedShifts,
  requestShiftChange,
  getShiftDetails,
};
