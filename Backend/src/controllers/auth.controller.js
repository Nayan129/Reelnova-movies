import userModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import redis from "../config/cache.js";

//  User Register Controller
async function registerController(req, res) {
  const { username, password, email } = req.body;

  // user already exist or not
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(401).json({
      message: "user already exist",
    });
  }

  // hash the password
  const hash = await bcrypt.hash(password, 10);

  // create user
  const user = await userModel.create({
    username: username,
    password: hash,
    email: email,
  });

  //after creating user sign token using jwt
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  //now token send to cookies
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  // now send res as user registered
  res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

// User Login Controller
async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username: username }, { email: email }],
    })
    .select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const PasswordValid = await bcrypt.compare(password, user.password);

  if (!PasswordValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // setting cookies for production lavel

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "user LoggedIn successfully...",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

// User Data Fetch who is LoggedIn
async function getMeController(req, res) {
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}

async function logoutController(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(200).json({
    message: "user logout successfully",
  });
}

export default {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
