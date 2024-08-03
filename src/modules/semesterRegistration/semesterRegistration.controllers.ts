import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB( req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration Created Succesfully',
    data: result,
  });
});

// const getAllFaculties = catchAsync(async (req, res) => {
//   const result = await FacultyServices.getAllFacultiesFromDB(req.query);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculties are retrieved succesfully',
//     data: result,
//   });
// });

// const updateFaculty = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { faculty } = req.body;
//   const result = await FacultyServices.updateFacultyIntoDB( id , faculty);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty is updated succesfully',
//     data: result,
//   });
// });

// const deleteFaculty = catchAsync(async (req, res) => {
//   const {  id } = req.params;
//   const result = await FacultyServices.deleteFacultyFromDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty is deleted succesfully',
//     data: result,
//   });
// });

export const SemesterRegistrationControllers = {
    createSemesterRegistration
};