import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicFaculty = catchAsync(async (req,res) => {
    const data = req.body;
    const result = await AcademicDepartmentServices.createAcadecDepartmentIntoDb(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created Successfully',
      data: result,
    });
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    res.status(200).json({
      success: true,
      message: 'Academic Department  are retrive Successfully',
      data: result,
    });
  });
  
  const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const departmentId = req.params.id;
    const result = await AcademicDepartmentServices.getSingleDepartmentFromDB(departmentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department  is  retrive Successfully',
      data: result,
    });
  });

export const AcademicDepartmentControllers = {
    createAcademicFaculty,getAllAcademicFaculty,getSingleAcademicFaculty,
};
