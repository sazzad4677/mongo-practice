import { Model, Schema, model } from "mongoose";
import { IGetStudentFullName, IStudent } from "./student.interface";

type StudentModel = Model<IStudent, {}, IGetStudentFullName>;

const StudentSchema = new Schema<IStudent, StudentModel, IGetStudentFullName>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  roll: { type: Number, required: true, unique: true },
  class: { type: Number, required: true },
  section: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"] },
});

StudentSchema.method("getStudentFullName", function getStudentFullName() {
  return this.name.firstName + " " + this.name.lastName;
});

export const StudentModal = model<IStudent, StudentModel>(
  "Student",
  StudentSchema
);
