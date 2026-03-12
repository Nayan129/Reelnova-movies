import express from "express";
import identifyUser from "../middleware/auth.middleware.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();

// Routes : POST - "/api/auth/register"
router.post("/register", authController.registerController);

// Routes : POST - "/api/auth/login"
router.post("/login", authController.loginController);

// Routes : GET - "/api/auth/get-me"
router.get("/get-me", identifyUser, authController.getMeController);

// Routes : GET - "/api/auth/logout"
router.post("/logout", identifyUser, authController.logoutController);

export default router;
