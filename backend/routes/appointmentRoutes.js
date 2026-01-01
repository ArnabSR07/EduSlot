const express = require("express");
const appointmentRouter = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const { requiredRole } = require("../middlewares/rolemiddleware");
const { bookAppointment } = require("../controllers/appointmentController");

//Student booking appointment

appointmentRouter.post(
  "/book",
  requireAuth,
  requiredRole("student"),
  bookAppointment
);

module.exports = appointmentRouter
