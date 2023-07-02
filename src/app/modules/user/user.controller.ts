import { NextFunction, Request, Response } from "express";
import {
  getAdminUserFromDB,
  getUserByIDFromDB,
  getUsersFromDB,
  saveUser,
} from "./user.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getUsersFromDB();
  res.status(200).json({
    status: "success",
    data: users,
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const user = await saveUser(data);
  res.status(200).json({ status: "success", data: user });
};
export const getUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await getUserByIDFromDB(id);
  res.status(200).json({ status: "success", data: user });
};

export const getAdminUser = async (req: Request, res: Response) => {
  const admins = await getAdminUserFromDB();
  res.status(200).json({ status: "success", data: admins });
};
