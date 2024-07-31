import express from "express"
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controllers";

const router = express.Router();


router.post("/create-academic-department", validateRequest(AcademicDepartmentValidation.academicDepartmentValidationSchema),AcademicDepartmentControllers.createAcademicFaculty)
router.get("/",AcademicDepartmentControllers.getAllAcademicFaculty)
router.get("/:departmentId",AcademicDepartmentControllers.getSingleAcademicFaculty)

export const AcademicDepartmentRouters = router;