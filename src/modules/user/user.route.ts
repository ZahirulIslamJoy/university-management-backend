import express from "express"
import { UserControllers } from "./user.controllers";
import validateRequest from "../../app/middleware/validateRequest";
import { studentValidations } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";

const router = express.Router();


router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent)
router.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    UserControllers.createFaculty,
  );

  router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
  );

export const UserRouters = router;