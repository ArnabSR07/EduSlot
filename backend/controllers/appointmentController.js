const Student = require("../models/student");
const Appointment = require("../models/appointment");
const Teacher = require("../models/teacher");

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

    const student = await Student.findOne({ user: req.dbUser._id });
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

//Approve the appointment by teacher

const approveAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    // Find teacher linked to logged-in user
    const teacher = await Teacher.findOne({
      user: req.dbUser._id,
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher profile not found",
      });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Ensure teacher owns appointment
    if (appointment.teacher.toString() !== teacher._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action",
      });
    }

    // Only pending appointments can be approved
    if (appointment.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending appointments can be approved",
      });
    }

    appointment.status = "approved";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment approved successfully",
      appointment,
    });

  } catch (error) {
    console.error("APPROVE APPOINTMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to approve appointment",
    });
  }
};

// Reject the appointment by teacher

const rejectAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const teacher = await Teacher.findOne({
      user: req.dbUser._id,
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher profile not found",
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.teacher.toString() !== teacher._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action",
      });
    }

    if (appointment.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending appointments can be rejected",
      });
    }

    appointment.status = "rejected";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment rejected successfully",
      appointment,
    });

  } catch (error) {
    console.error("REJECT APPOINTMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reject appointment",
    });
  }
};

module.exports = { bookAppointment, approveAppointment, rejectAppointment };
