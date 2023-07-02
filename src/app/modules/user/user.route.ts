import express from "express";
import {
  createUser,
  getAdminUser,
  getUserByID,
  getUsers,
} from "./user.controller";
const router = express.Router();
router.get("/", getUsers);
router.get("/admins", getAdminUser);
router.post("/create-user", createUser);
router.get("/:id", getUserByID);

export default router;
