const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  try {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;
    // Use async/await since findOne returns a Promise
    const userExist = await Admin.findOne({ username: username });
    if (
      userExist &&
      userExist.password === password &&
      userExist.username === username
    ) {
      // If the user exists and the credentials match, proceed to the next middleware
      next();
    } else {
      // If the user does not exist or the credentials do not match, return a 401 Unauthorized response
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in adminMiddleware:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = adminMiddleware;
