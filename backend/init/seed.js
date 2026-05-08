require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/database");

const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Availability = require("../models/availability");
const Appointment = require("../models/appointment"); 
const Chat = require("../models/chat");
const Message = require("../models/message");

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Student.deleteMany(),
      Teacher.deleteMany(),
      Availability.deleteMany(),
      Appointment.deleteMany(),
      Chat.deleteMany(),
      Message.deleteMany(),
    ]);

    //  STUDENT USER (Clerk-based)
    const studentUser = await User.create({
      clerkUserId: "seed_student_clerk_id",
      name: "Test Student",
      email: "student@test.com",
      role: "student",
    });

    const student = await Student.create({
      user: studentUser._id,
      roll: "22101106015",
    });

    //  TEACHER USER (Clerk-based)
    const teacherUser = await User.create({
      clerkUserId: "seed_teacher_clerk_id",
      name: "Test Teacher",
      email: "teacher@test.com",
      role: "teacher",
    });

    const teacher = await Teacher.create({
      user: teacherUser._id,
      subjects: ["DBMS"],
      department: "IT",
    });

    //  Availability
    await Availability.create({
      teacher: teacher._id,
      day: "Monday",
      slots: ["10:00 - 10:30"],
    });

    //  Appointment
    const appointment = await Appointment.create({
      student: student._id,
      teacher: teacher._id,
      date: new Date(),
      timeSlot: "10:00 - 10:30",
      status: "approved",
    });

    //  Chat
    const chat = await Chat.create({
      appointment: appointment._id,
      participants: [studentUser._id, teacherUser._id],
    });

    //  Message
    await Message.create({
      chat: chat._id,
      sender: studentUser._id,
      text: "Hello Sir",
    });

    console.log(" All collections seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
};

seed();
