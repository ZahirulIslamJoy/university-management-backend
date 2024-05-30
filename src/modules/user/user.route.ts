import express from "express"
import { UserControllers } from "./user.controllers";

const router = express.Router();


router.post("/create-student", UserControllers.createStudent)

export const UserRouters = router;