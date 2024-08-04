import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req,res) => {
    //now call the service function
    const result = await offeredCourseServices.createOfferdCourseIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course is created Successfully',
      data: result,
    });
})




export const OfferedCourseControllers = {
    createOfferedCourse
};
