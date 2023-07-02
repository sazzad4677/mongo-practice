import { IStudent } from "./student.interface";
import { StudentModal } from "./student.model";

export const getAllStudentFromDB = async (): Promise<IStudent[]> => {
  const students = await StudentModal.find();
  return students;
};

export const addStudentIntoDB = async (s: IStudent): Promise<IStudent> => {
  const student = new StudentModal(s);
  console.log(student.getStudentFullName());
  student.save();
  return student;
};

export const getStudentByRollFromDB = async (
  roll: number
): Promise<IStudent | null> => {
  const student = await StudentModal.findOne({ roll });
  return student;
};
