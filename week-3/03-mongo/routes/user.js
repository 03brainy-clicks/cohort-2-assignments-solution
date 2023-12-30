const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const { username, password } = req.body;
    if (username && password) {
      const newUser = await User.create({ username, password });
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error in user signup:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find();
    return res.status(200).json({ courses: courses });
  } catch (error) {
    console.error("Error in listing courses:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// router.post("/courses/:courseId", userMiddleware, async (req, res) => {
//   // Implement course purchase logic
//   try {
//     const { courseId } = req.params;
//     if (courseId) {
//       const course = await Course.findById(courseId);
//       if (course) {
//         // const updatedUser = await User.updateOne(
//         //   { username: req.headers.username },
//         //   { $addToSet: { purchasedCourses: course } },
//         //   { new: true } // Corrected: Use 'new' option to return the modified document
//         // );
//         const user = await User.findOne({ username: req.headers.username });
//         if (user.purchasedCourses) {
//           user.purchasedCourses.push(course);
//         } else {
//           user.purchasedCourses = [course];
//         }
//         await user.save();
//         return res.status(200).json({
//           message: "Course purchased successfully",
//         });
//       } else {
//         return res.status(400).json({
//           message: "Invalid course id",
//         });
//       }
//     }
//   } catch (error) {
//     console.error("Error in purchasing course:", error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// });

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;

    if (courseId) {
      const course = await Course.findById(courseId);

      if (course) {
        const user = await User.findOne({ username: req.headers.username });

        if (user) {
          if (!user.purchasedCourses) {
            user.purchasedCourses = [];
          }

          // Use $addToSet to add unique courses
          user.purchasedCourses.push(course);
          user.markModified("purchasedCourses"); // Mark the field as modified

          await user.save();

          return res.status(200).json({
            message: "Course purchased successfully",
          });
        } else {
          return res.status(400).json({
            message: "User not found",
          });
        }
      } else {
        return res.status(400).json({
          message: "Invalid course id",
        });
      }
    }
  } catch (error) {
    console.error("Error in purchasing course:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const user = await User.findOne({ username: req.headers.username });
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
