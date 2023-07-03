import { Model, Schema, model } from "mongoose";
import { IGetHeadOfDept, ITeacher } from "./teacher.interface";

type DeptHeadModal = Model<ITeacher, {}, IGetHeadOfDept>;

const teacherSchema = new Schema<ITeacher, DeptHeadModal>({
  id: { type: "string", required: true, unique: true },
  teacherName: {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
  },
  department: { type: "string", required: true },
  role: { type: "string", required: true },
});

teacherSchema.method(
  "isHeadOfDept",
  function isHeadOfDept(role: string): boolean {
    return this.role === "head" ? true : false;
  }
);

export const Teacher = model<ITeacher, DeptHeadModal>("Teacher", teacherSchema);
