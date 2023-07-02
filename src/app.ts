import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello! World");
});

export default app;
