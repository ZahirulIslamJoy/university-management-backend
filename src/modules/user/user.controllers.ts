import { UserServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';

const createStudent = catchAsync(async (req,res) => {
    const { password, student } = req.body;
    //now call the service function
    const result = await UserServices.createStudentIntoDb(password, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created Successfully',
      data: result,
    });
})

export const UserControllers = {
  createStudent,
};
