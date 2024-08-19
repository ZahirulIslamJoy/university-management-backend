import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Students are retrive Successfully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrive Successfully',
    data: result,
  });
});

const deleteStudents = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is delete Successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.updateStudentIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is updated Successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
  updateStudent,
};
