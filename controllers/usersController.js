import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const emailExist = await userModel.findOne({ email: email });
    if (emailExist) {
      return res.json({
        success: false,
        message: "Email already registered..",
      });
    }

    const phoneExist = await userModel.findOne({ phone: phone });
    if (phoneExist) {
      return res.json({
        success: false,
        message: "Phone number already registered..",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({
      success: true,
      message: "SignUp successful..",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Internal server Error" });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.cookies?.authToken;
  
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    } else {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};

const signIn = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const options = {
      expiresIn: rememberMe ? "7d" : "1h",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 3600 * 1000,
      sameSite: "Strict",
    });

    return res.json({
      success: true,
      message: "Login successful",
      userId: user._id,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const logout = (req, res) => {
  res.clearCookie("authToken");
  return res.json({ success: true, message: "Logged out successfully" });
};

const userDetails = async (req, res) => {
  const { userId } = req.query;
  try {
   
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.password = undefined;

    return res.json({
      success: true,
      userDetails: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { signUp, signIn, logout, verifyToken, userDetails };
