import { Request, Response } from 'express';
import { StudentServices } from './student.service'



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
    res.status(500).json({
      success:false,
      message:"Something Went wrong",
  })
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
      res.status(500).json({
        success:false,
        message:"Something Went wrong",
    })
    }
 }


 const deleteStudents=async(req:Request,res:Response)=>{
  try{
  const id=req.params.id;
   const result = await StudentServices.deleteStudentFromDB(id);
   res.status(200).json({
       success: true,
       message: 'Students are delete Successfully',
       data: result,
     });
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Something Went wrong",
  })
  }
}






export const StudentControllers={
    getAllStudents,getSingleStudents,deleteStudents
}
