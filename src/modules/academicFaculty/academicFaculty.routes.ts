import express from "express"
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controllers";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();


router.post("/create-academic-faculty", validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty)
router.get("/",AcademicFacultyControllers.getAllAcademicFaculty)
router.get("/:facultyId",AcademicFacultyControllers.getSingleAcademicFaculty)

export const AcademicFacultyRouters = router;