import httpStatus from 'http-status';
import { EnrolledCourseServices } from './enrolledCourse.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createEnrolledCourse = catchAsync(async (req, res) => {
const result = await EnrolledCourseServices.createEnrolledCourseIntoDB()
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