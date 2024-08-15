import express from "express"
import { StudentControllers } from "./student.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();


router.get("/", auth(USER_ROLE.superAdmin, USER_ROLE.admin),StudentControllers.getAllStudents)

router.get("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),StudentControllers.getSingleStudents)

router.patch("/:id",  auth(USER_ROLE.superAdmin, USER_ROLE.admin),StudentControllers.updateStudent)

router.delete("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin),StudentControllers.deleteStudents)

export const StudentRoutes=router