import express from "express"
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controllers";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();


router.post("/create-academic-faculty",auth(USER_ROLE.superAdmin , USER_ROLE.admin), validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty)
router.get("/",auth(USER_ROLE.admin),AcademicFacultyControllers.getAllAcademicFaculty)
router.get("/:facultyId",AcademicFacultyControllers.getSingleAcademicFaculty)

export const AcademicFacultyRouters = router;