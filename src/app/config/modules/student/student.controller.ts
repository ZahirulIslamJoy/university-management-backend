import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { error } from 'console';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const {student:studentData} = req.body;

   const {error} =studentValidationSchema.validate(studentData);

   if(error){
    res.status(500).json({
        success:false,
        message:"Something Went wrong",
        error:error.details
    })
   }

    //now call the service function
    const result = await StudentServices.createStudentIntoDb(studentData);

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents=async(req:Request,res:Response)=>{
   try{
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
        success: true,
        message: 'Students are retrive Successfully',
        data: result,
      });
   }
   catch(err){
    console.log(error)
   }
}


const getSingleStudents=async(req:Request,res:Response)=>{
    try{
    const id=req.params.id;
     const result = await StudentServices.getSingleStudentFromDB(id);
     res.status(200).json({
         success: true,
         message: 'Students are retrive Successfully',
         data: result,
       });
    }
    catch(err){
     console.log(error)
    }
 }






export const StudentControllers={
    createStudent,getAllStudents,getSingleStudents
}
