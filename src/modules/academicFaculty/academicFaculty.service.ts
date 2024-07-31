import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcadecFacultyIntoDb = async (payload : TAcademicFaculty) => {
  const newFaculty = await AcademicFaculty.create(payload);
  return newFaculty

};

const getAllAcademicFacultyFromDB=async()=>{
    const result=await AcademicFaculty.find();
    return result;
}

const getSingleFacultyFromDB=async(id:string)=>{
    //const result=await StudentModel.findOne({id:id});
    const result=await AcademicFaculty.aggregate([
        {$match:{id:id}}
    ])
    return result;
}



export const AcademicFacultyServices = {
    createAcadecFacultyIntoDb,getAllAcademicFacultyFromDB,getSingleFacultyFromDB
};
