import express from "express";
import {
  login,
  logout,
  register,
  userInfo,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register

router.post("/register", register);
router.post("/login", login);
router.get("/userInfo", protect, userInfo);
router.post("/logout", logout);
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please provide all required fields" });
//   }

//   const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [
//     email,
//   ]);

//   if (userExists.rows.length > 0) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await pool.query(
//     "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
//     [name, email, hashedPassword]
//   );

//   const token = generateToken(newUser.rows[0].id);

//   res.cookie("token", token, cookieOptions);

//   return res.status(201).json({ user: newUser.rows[0] });
// });

// Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Please provide all required fields" });
//   }

//   const user = await pool.query("SELECT * FROM users WHERE email = $1", [
//     email,
//   ]);

//   if (user.rows.length === 0) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }

//   const userData = user.rows[0];

//   const isMatch = await bcrypt.compare(password, userData.password);

//   if (!isMatch) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }

//   const token = generateToken(userData.id);

//   res.cookie("token", token, cookieOptions);

//   res.json({
//     user: {
//       id: userData.id,
//       name: userData.name,
//       email: userData.email,
//     },
//   });
// });

// // Me
// router.get("/me", protect, async (req, res) => {
//   res.json(req.user);
//   // return info of the logged in user from protect middleware
// });

// // Logout
// router.post("/logout", (req, res) => {
//   res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
//   res.json({ message: "Logged out successfully" });
// });

export default router;
