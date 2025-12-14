const mongoose = require("mongoose");
const connectDB = require("../config/database");

const User = require("../models/User");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Availability = require("../models/availability");
const Appointment = require("../models/apppointment");
const Chat = require("../models/chat");
const Message = require("../models/message");

const seed = async () => {
  await connectDB();

  //Deleting old data if any
  await Promise.all([
    User.deleteMany(),
    Student.deleteMany(),
    Teacher.deleteMany(),
    Availability.deleteMany(),
    Appointment.deleteMany(),
    Chat.deleteMany(),
    Message.deleteMany(),
  ]);

  const studentUser = await User.create({
    name: "Test Student",
    email: "student@test.com",
    password: "123456",
    role: "student",
  });

  const student = await Student.create({
    user: studentUser._id,
    roll: "22101106015",
  });

  const teacherUser = await User.create({
    name: "Test Teacher",
    email: "teacher@test.com",
    password: "123456",
    role: "teacher",
  });

  const teacher = await Teacher.create({
    user: teacherUser._id,
    subjects: ["DBMS"],
    department: "IT",
  });

  await Availability.create({
    teacher: teacher._id,
    day: "Monday",
    slots: ["10:00 - 10:30"],
  });

  const appointment = await Appointment.create({
    student: student._id,
    teacher: teacher._id,
    date: new Date(),
    timeSlot: "10:00 - 10:30",
  });

  const chat = await Chat.create({
    appointment: appointment._id,
    participants: [studentUser._id, teacherUser._id],
  });

  await Message.create({
    chat: chat._id,
    sender: studentUser._id,
    text: "Hello Sir",
  });

  console.log("All collections created successfully");
};

seed();
