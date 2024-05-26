import { Student } from './student.interface';
import { StudentModel } from './student.models';

const createStudentIntoDb = async (student: Student) => {

    if(await StudentModel.isExists(student.id)){
        throw new Error("user already exists")
    }

    const result = await StudentModel.create(student);
    return result;
};


const getAllStudentsFromDB=async()=>{
    const result=await StudentModel.find();
    return result;
}

const getSingleStudentFromDB=async(id:string)=>{
    //const result=await StudentModel.findOne({id:id});
    const result=await StudentModel.aggregate([
        {$match:{id:id}}
    ])
    return result;
}


const deleteStudentFromDB=async(id:string)=>{
    const result=await StudentModel.updateOne({id:id} , {isDeleted:true});
    return result;
}

export const StudentServices={
    createStudentIntoDb,getAllStudentsFromDB,getSingleStudentFromDB,deleteStudentFromDB
}