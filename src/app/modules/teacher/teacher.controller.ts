import { Request, Response } from "express";
import {
  createTeacherIntoDB,
  getAllTeacherFromDB,
  getTeacherByIDFromDB,
} from "./teacher.service";

export const getAllTeacher = async (req: Request, res: Response) => {
  const teachers = await getAllTeacherFromDB();
  res.status(200).json({
    status: "Success",
    data: teachers,
  });
};
export const createTeacher = async (req: Request, res: Response) => {
  const teachers = await createTeacherIntoDB(req.body);
  res.status(200).json({
    status: "Success",
    data: teachers,
  });
};
export const getTeacherByID = async (req: Request, res: Response) => {
  const teacher = await getTeacherByIDFromDB(req.params.id);
  res.status(200).json({
    status: "Success",
    data: teacher,
  });
};
