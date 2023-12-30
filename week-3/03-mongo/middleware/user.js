const { User } = require("../db");

// Middleware for handling auth
async function userMiddleware(req, res, next) {
  try {
    // Implement User auth logic
    // You need to check the headers and validate the User from the User DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;
    // Use async/await since findOne returns a Promise
    const userExist = await User.findOne({ username: username });
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
    console.error("Error in UserMiddleware:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = userMiddleware;
