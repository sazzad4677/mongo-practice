import { ITeacher } from "./teacher.interface";
import { Teacher } from "./teacher.model";

export const getAllTeacherFromDB = async (): Promise<ITeacher[]> => {
  const teachers = await Teacher.find();
  return teachers;
};
export const createTeacherIntoDB = async (t: ITeacher): Promise<ITeacher> => {
  const teacher = new Teacher(t);
  const isHeadOfDept = teacher.isHeadOfDept(teacher.role);
  console.log(isHeadOfDept);
  teacher.save();
  return teacher;
};
export const getTeacherByIDFromDB = async (
  id: string
): Promise<ITeacher | null> => {
  const teachers = await Teacher.findOne({ id });
  return teachers;
};
