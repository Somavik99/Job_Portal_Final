import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill in all required fields!", 400));
  }
  const isEmailRegistered = await User.findOne({ email });
  if (isEmailRegistered) {
    return next(new ErrorHandler("Email already registered!", 400));
  }
  const user = await User.create({ name, email, phone, password, role });
  const token = user.getJWTToken(3600);
  sendToken(user, 201, res, "User registered successfully!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid credentials.", 401));
  }
  if (user.role !== role) {
    return next(new ErrorHandler(`User with provided email and ${role} role not found!`, 404));
  }
  const token = user.getJWTToken(3600);
  sendToken(user, 200, res, "User logged in successfully!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token").status(200).json({ success: true, message: "Logged out successfully." });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  res.status(200).json({ success: true, user });
});

export const checkUser = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  // Check if the email is provided
  if (!email) {
    return next(new ErrorHandler('Please provide an email.', 400));
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: 'User does not exist.' });
    }

    // Send OTP
    const data = await axios.post(
      'http://localhost:4000/send-otp',
      req.body,
      { withCredentials: true }
    );

    // Check if there's an error in sending OTP
    if (data.data.error) {
      return res.json({ error: data.data.error });
    }

    // User exists, OTP sent successfully
    return res.json({ exist: true });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Error checking user.', 500));
  }
});


