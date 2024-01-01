const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_PASSWORD = "Hustle@07";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    if (username && password) {
      await Admin.create({ username, password });
      return res.status(201).json({ message: "Admin created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failded to signup" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    if (username && password) {
      const admin = await Admin.findOne({username});
      const token = jwt.sign({ username, password }, JWT_PASSWORD);
      return res
        .status(201)
        .json({ message: "Signin successfully", token: token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failded to signin" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const { title, description, imageLink, price } = req.body;
    if (title && description && imageLink && price) {
      const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price,
      });
      return res.status(201).json({
        message: "Course created successfully",
        courseId: newCourse._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failded to create course" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find();
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
