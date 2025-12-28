const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const requireAuth = ClerkExpressRequireAuth({
  authorizedParties: ["http://localhost:3000"], // frontend origin
});

module.exports = requireAuth;
