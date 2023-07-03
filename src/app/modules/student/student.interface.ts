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

export interface IGetStudentFullName {
  getStudentFullName(): string;
}
