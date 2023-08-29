import express from "express";
import {
  getAllUser,
  getUserByID,
  userSingUp,
  userlogin,
} from "../controllers/user_controller";

const userRoute = express.Router();

userRoute.get("/", getAllUser);
userRoute.get("/:id", getUserByID);
userRoute.post("/singup", userSingUp);
userRoute.post("/login", userlogin);

export default userRoute;
