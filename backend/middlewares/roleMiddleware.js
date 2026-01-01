const User = require("../models/user");

const requiredRole = (role) => {
  return async (req, res, next) => {
    try {
      const clerkUserId = req.auth.userId;
      const user = User.findOne({ clerkUserId });
      if (!user || user.role !== role) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
      req.dbUser = user;
      next();
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Role check failed. Your role is not suitable",
        });
    }
  };
};

module.exports = {requiredRole}
