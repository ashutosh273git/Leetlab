import express from "express"
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js"
import { createProblem } from "../controllers/problem.controller.js"

const problemRoutes = express.Router()

problemRoutes.post("/create-problem", authMiddleware, checkAdmin, createProblem)

problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems)

export default problemRoutes