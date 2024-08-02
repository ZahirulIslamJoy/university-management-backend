import express from 'express';
import { updateFacultyValidationSchema } from './faculty.validation';
import { FacultyControllers } from './faculty.controllers';
import validateRequest from '../../app/middleware/validateRequest';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;