import express from "express"
import { UserControllers } from "./user.controllers";
import validateRequest from "../../app/middleware/validateRequest";
import { studentValidations } from "../student/student.validation";

const router = express.Router();


router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent)

export const UserRouters = router;