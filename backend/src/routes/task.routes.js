import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

import { isAuthenticate } from "../middleware/auth.middlewere.js";

const router = express.Router();

router.post("/", isAuthenticate, createTask);
router.get("/", isAuthenticate, getAllTasks);
router.get("/:id", isAuthenticate, getTaskById);
router.put("/:id", isAuthenticate, updateTask);
router.delete("/:id", isAuthenticate, deleteTask);

export default router;