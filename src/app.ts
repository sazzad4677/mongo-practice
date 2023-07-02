import cors from "cors";
import express, { Application } from "express";

// Application routes
import { StudentRoute } from "./app/modules/student/student.route";
import UserRoute from "./app/modules/user/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/student", StudentRoute);

export default app;

/*
Interface = > interface.ts
model, schema => model.ts
route
route function => controller.ts
DB Query Function => service.ts

*/
