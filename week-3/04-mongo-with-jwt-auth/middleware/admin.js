const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
const JWT_PASSWORD = "Hustle@07";

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const decodeToken = jwt.verify(token, JWT_PASSWORD);
      const admin = await Admin.findOne({ username: decodeToken.username });
      if(admin.password === decodeToken.password){
        next();
      }
    } else {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong",
    error
 });
  }
}

module.exports = adminMiddleware;
