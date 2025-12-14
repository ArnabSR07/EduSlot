const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    day: {
      type: String, 
      required: true,
    },

    slots: [
      {
        type: String, 
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);
