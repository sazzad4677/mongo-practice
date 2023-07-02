import { Model } from "mongoose";

export interface IStudent {
  name: {
    firstName: string;
    lastName: string;
  };
  roll: number;
  class: number;
  section: string;
  gender: "Male" | "Female";
}

export interface IGetStudentFullName extends Model<IStudent> {
  getStudentFullName(): string;
}
