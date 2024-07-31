import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req,res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created Successfully',
      data: result,
    });
})


const getSingleAcademicSemester = catchAsync(async (req,res) => {
  const semesterId = req.params.semesterId;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrive Successfully',
    data: result,
  });
})

export const AcademicSemesterControllers = {
    createAcademicSemester,getSingleAcademicSemester
};
