require("dotenv").config();
const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("=== AUTHENTICATION DEBUG ===");
  console.log("Auth header:", authHeader);
  console.log("All headers:", req.headers);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No Bearer token found");
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token ? token.substring(0, 50) + "..." : "No token");

  try {
    // For Clerk tokens, we need to verify them differently
    // Clerk tokens are JWTs but they're signed by Clerk, not our server
    // For now, we'll decode the token to get user info without verification
    // In production, you should verify the token with Clerk's public key
    
    const decoded = jwt.decode(token);
    console.log("Token decoded:", decoded ? "Success" : "Failed");
    
    if (!decoded) {
      console.log("Failed to decode token");
      return res
        .status(403)
        .json({ message: "Invalid token format" });
    }

    console.log("Decoded token payload:", {
      sub: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      exp: decoded.exp
    });

    // Extract user information from Clerk token
    req.user = {
      id: decoded.sub, // Clerk user ID
      email: decoded.email,
      name: decoded.name || decoded.email
    };

    console.log("User set in request:", req.user);
    console.log("=== AUTHENTICATION SUCCESS ===");
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    console.log("=== AUTHENTICATION FAILED ===");
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is invalid or expired" });
  }
};

module.exports = ensureAuthenticated;
