import { Student } from './student.interface';
import { StudentModel } from './student.models';

const createStudentIntoDb = async (student: Student) => {
    const result = await StudentModel.create(student);
    return result;
};


const getAllStudentsFromDB=async()=>{
    const result=await StudentModel.find();
    return result;
}

const getSingleStudentFromDB=async(id:string)=>{
    const result=await StudentModel.findOne({_id:id});
    return result;
}

export const StudentServices={
    createStudentIntoDb,getAllStudentsFromDB,getSingleStudentFromDB
}