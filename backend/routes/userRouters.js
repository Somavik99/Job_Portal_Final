 

import express from "express";
import { login, register, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { sendOTP } from "../utils/otpController.js"; // Import the sendOTP function

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

// Add a new route for sending OTP
router.post("/send-otp", sendOTP);

export default router;
