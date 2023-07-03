import cors from "cors";
import express, { Application } from "express";

// Application routes
import { StudentRoute } from "./app/modules/student/student.route";
import { TeacherRoute } from "./app/modules/teacher/teacher.route";
import UserRoute from "./app/modules/user/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/student", StudentRoute);
app.use("/api/v1/teacher", TeacherRoute);

export default app;

/*
Interface = > interface.ts
model, schema => model.ts
route
route function => controller.ts
DB Query Function => service.ts

*/

/*
    Custom Methods
        1. Interface Methods =>
            interface IGetStudentFullName {
                StudentFullName(): string;
            }
        2. Make a Modal
            type StudentModel = Model<IStudent, {}, IGetStudentFullName>; // IStudent -> Main Interface , IGetStudentFullName -> Custom Method
        3. Make a Schema with method
            const StudentSchema = new Schema<IStudent, StudentModel, IGetStudentFullName>({}); // Pattern -> Main Interface , Modal (2nd step), Custom Methods
        4. Make a Schema with method
            StudentSchema.method("getStudentFullName", function getStudentFullName() {
                return`
            });
        5.Make modal with custom modal (step 2 modal)
            export const StudentModal = model<IStudent, StudentModel>("Student", StudentSchema);
*/
