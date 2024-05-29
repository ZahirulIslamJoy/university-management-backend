import { NextFunction, Request , Response} from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response , next : NextFunction) => {
    try {
      const {password,student} = req.body;
  
      //now call the service function
      const result = await UserServices.createStudentIntoDb(password,student)
  
      res.status(200).json({
        success: true,
        message: 'Student Created Successfully',
        data: result,
      });
    } catch (err) {
      next(err)
    }
  };


 export  const UserControllers={
    createStudent,
  }