import { NextFunction, Request , Response} from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response , next : NextFunction) => {
    try {
      const {password,student} = req.body;
  
      //now call the service function
      const result = await UserServices.createStudentIntoDb(password,student)
      sendResponse(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Student is created Successfully",
        data:result
      })
  
      
    } catch (err) {
      next(err)
    }
  };


 export  const UserControllers={
    createStudent,
  }