// import express from 'express'

// import {
//     createProject,
//     getAllProjects,
//     getProjectById,
//     updateProject,
//     deleteProject
// } from '../controllers/project.contrller.js'

// import {isAuthenticate} from '../middleware/auth.middlewere.js'

// const projectRoutes = express.Router();


// projectRoutes.post("/", isAuthenticate, createProject);

// projectRoutes.get("/", isAuthenticate, getAllProjects);

// projectRoutes.get("/:id", isAuthenticate, getProjectById);

// projectRoutes.put("/:id", isAuthenticate, updateProject);

// projectRoutes.delete("/:id", isAuthenticate, deleteProject);
// export default projectRoutes



import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.contrller.js";

import { isAuthenticate } from "../middleware/auth.middlewere.js";

const router = express.Router();

router.post("/", isAuthenticate, createProject);

router.get("/", isAuthenticate, getAllProjects);

router.get("/:id", isAuthenticate, getProjectById);

router.put("/:id", isAuthenticate, updateProject);

router.delete("/:id", isAuthenticate, deleteProject);

export default router;