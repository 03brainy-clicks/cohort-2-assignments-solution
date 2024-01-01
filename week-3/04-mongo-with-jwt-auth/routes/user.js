const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_PASSWORD = "Hustle@07";

// User Routes
router.post("/signup", async (req, res) => {
  // Implement User signup logic
  try {
    const { username, password } = req.body;
    if (username && password) {
      await User.create({ username, password });
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failded to signup" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement User signup logic
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await User.findOne({ username });
      const token = jwt.sign({ username, password }, JWT_PASSWORD);
      return res
        .status(201)
        .json({ message: "Signin successfully", token: token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failded to signin" });
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find();
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodedUser = jwt.verify(token, JWT_PASSWORD);

      const user = await User.findOne({ username: decodedUser.username });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!user.purchasedCourses) {
        await User.updateOne(
          { username: user.username },
          {
            $set: { purchasedCourses: [course] },
          }
        );
        return res
          .status(200)
          .json({ message: "Course purchased successfully" });
      } else {
        await User.updateOne(
          { username: user.username },

          { purchasedCourses: [...user.purchasedCourses, course] }
        );
        return res
          .status(200)
          .json({ message: "Course purchased successfully" });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error in purchasing course:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeUser = jwt.decode(token, JWT_PASSWORD);
    const user = await User.findOne({ username: decodeUser.username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } catch (error) {
    console.error("Error in fetching purchased courses:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
