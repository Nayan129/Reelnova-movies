import express from "express";
import historyController from "../controllers/history.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const historyRouter = express.Router();

historyRouter.post("/", authMiddleware, historyController.addHistory);

historyRouter.get("/", authMiddleware, historyController.getHistory);

historyRouter.delete("/clear", authMiddleware, historyController.clearHistory);

historyRouter.delete("/:id", authMiddleware, historyController.deleteHistory);

export default historyRouter;
