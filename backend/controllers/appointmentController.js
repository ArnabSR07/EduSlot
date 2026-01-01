const Student = require("../models/student");
const Appointment = require("../models/appointment");

const bookAppointment = async (req, res) => {
  try {
    const { teacherId, date, timeSlot } = req.body;

    if (!teacherId || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //finding student linked to logged-in-user

    const student = Student.findOne({ user: req.dbUser._id });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    //Checking if slot is already booked

    const existing = await Appointment.findOne({
      teacher: teacherId,
      date: new Date(date),
      timeSlot,
      status: { $ne: "rejected" },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "The Selected Slot is currently unavailable",
      });
    }

    const appointment = await Appointment.create({
      student: student._id,
      teacher: teacherId,
      date,
      timeSlot,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("BOOK APPOINTMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
};

module.exports = { bookAppointment };
