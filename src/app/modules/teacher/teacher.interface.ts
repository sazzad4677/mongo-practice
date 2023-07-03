export interface ITeacher {
  id: string;
  teacherName: {
    firstName: string;
    lastName: string;
  };
  department: string;
  role: string;
}

export interface IExtendedTeacher extends ITeacher {
  isHeadOfDept: boolean;
}

export interface IGetHeadOfDept {
  isHeadOfDept(role: string): ITeacher;
}
