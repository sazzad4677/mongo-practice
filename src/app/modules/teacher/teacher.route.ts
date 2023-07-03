import express from "express";
import { createTeacher, getAllTeacher } from "./teacher.controller";
const router = express.Router();

router.get("/", getAllTeacher);
router.post("/create-teacher", createTeacher);
router.get("/:id", getAllTeacher);

export const TeacherRoute = router;
