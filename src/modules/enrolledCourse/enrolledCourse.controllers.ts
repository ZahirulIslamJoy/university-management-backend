import httpStatus from 'http-status';
import { EnrolledCourseServices } from './enrolledCourse.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createEnrolledCourse = catchAsync(async (req, res) => {
const userId = req.user.userId;
const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(userId , req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });
});



export const EnrolledCourseControllers = {
  createEnrolledCourse,
};