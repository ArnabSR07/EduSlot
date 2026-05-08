const express = require("express");
const appointmentRouter = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const { requiredRole } = require("../middlewares/rolemiddleware");
const { bookAppointment, approveAppointment, rejectAppointment } = require("../controllers/appointmentController");

//Student booking appointment

appointmentRouter.post(
  "/book",
  requireAuth,
  requiredRole("student"),
  bookAppointment
);

appointmentRouter.patch("/:id/approve",requireAuth,requiredRole("teacher"),approveAppointment);
appointmentRouter.patch("/:id/reject",requireAuth,requiredRole("teacher"),rejectAppointment);

module.exports = appointmentRouter
