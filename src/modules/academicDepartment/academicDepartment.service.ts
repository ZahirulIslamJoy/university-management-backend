import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartment } from "./academicDepartment.model";

const createAcadecDepartmentIntoDb = async (payload : TAcademicDepartment) => {
  const newDepartment = await academicDepartment.create(payload);
  return newDepartment

};

const getAllAcademicDepartmentFromDB=async()=>{
    const result=await academicDepartment.find();
    return result;
}

const getSingleDepartmentFromDB=async(id:string)=>{
    const result=await academicDepartment.findOne({id:id});
    // const result=await AcademicFaculty.aggregate([
    //     {$match:{id:id}}
    // ])
    return result;
}



export const AcademicDepartmentServices = {
    createAcadecDepartmentIntoDb,getAllAcademicDepartmentFromDB,getSingleDepartmentFromDB
};
