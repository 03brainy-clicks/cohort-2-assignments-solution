const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password)
    if (username && password) {
      const newAdmin = await Admin.create({
        username: username,
        password: password,
      });

      // Assuming you want to return the created user data in the response
      return res.status(201).json({
        message: "Admin created successfully",
        user: newAdmin,
      });
    } else {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error in admin signup:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { title, description, imageLink, price } = req.body;
    if (title && description && imageLink && price) {
      const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price,
      });

      // Extract the course ID from the newCourse object
      const courseId = newCourse._id;

      return res.status(201).json({
        message: "Course created successfully",
        courseId: courseId,
      });
    } else {
      return res.status(400).json({
        message: "Invalid course details",
      });
    }
  } catch (error) {
    console.error("Error in creating course:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    // Implement fetching all courses logic
    const courses = await Course.find();
    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error in fetching courses:", error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router;
