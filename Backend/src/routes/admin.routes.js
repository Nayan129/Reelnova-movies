import express from "express";
import identifyUser from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import adminController from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get(
  "/users",
  identifyUser,
  adminMiddleware,
  adminController.getAllUsers,
);

adminRouter.patch(
  "/users/:id/ban",
  identifyUser,
  adminMiddleware,
  adminController.banUser,
);

adminRouter.delete(
  "/users/:id",
  identifyUser,
  adminMiddleware,
  adminController.deleteUser,
);

export default adminRouter;
