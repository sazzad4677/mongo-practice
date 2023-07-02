import express from "express";
import {
  addStudent,
  getAllStudent,
  getStudentByRoll,
} from "./student.controller";
const router = express.Router();

router.get("/", getAllStudent);
router.post("/create-student", addStudent);
router.get("/student-by-roll", getStudentByRoll);

export const StudentRoute = router;
