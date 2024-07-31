import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req,res) => {
    const {data} = req.body;
    const result = await AcademicFacultyServices.createAcadecFacultyIntoDb(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is created Successfully',
      data: result,
    });
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrive Successfully',
      data: result,
    });
  });
  
  const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const facultyId = req.params.id;
    const result = await AcademicFacultyServices.getSingleFacultyFromDB(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrive Successfully',
      data: result,
    });
  });

export const AcademicFacultyControllers = {
    createAcademicFaculty,getAllAcademicFaculty,getSingleAcademicFaculty
};
