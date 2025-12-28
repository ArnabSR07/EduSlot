const User = require("../models/user");

const syncUser = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    let user = await User.findOne({ clerkUserId });

    if (!user) {
      user = await User.create({
        clerkUserId,
        role: "student",
      });

      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({
      success: false,
      message: "User sync failed",
    });
  }
};

module.exports = { syncUser };
