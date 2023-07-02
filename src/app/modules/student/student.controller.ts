import { Request, Response } from "express";
import {
  addStudentIntoDB,
  getAllStudentFromDB,
  getStudentByRollFromDB,
} from "./student.service";

export const getAllStudent = async (req: Request, res: Response) => {
  const getStudent = await getAllStudentFromDB();
  res.status(200).json({
    status: "Success",
    data: getStudent,
  });
};
export const addStudent = async (req: Request, res: Response) => {
  const addStudent = await addStudentIntoDB(req.body);
  res.status(200).json({
    status: "Success",
    data: addStudent,
  });
};
export const getStudentByRoll = async (req: Request, res: Response) => {
  const roll = req.query.roll as string;
  const rollNumber = parseInt(roll, 10);
  if (isNaN(rollNumber)) {
    res.status(400).json({
      status: "Failed to parse",
      message: "Invalid roll number provided",
    });
    return;
  }
  const addStudent = await getStudentByRollFromDB(rollNumber);
  res.status(200).json({
    status: "Success",
    data: addStudent,
  });
};
