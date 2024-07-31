import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastSemesterId=async()=>{
    const lastStudent=await User.findOne({
        role:'student'
    },{
        id:1,
        _id:0
    }).sort({createdAt:-1}).lean()

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}


export const generateStudentId=async(payload: TAcademicSemester)=>{
    const currentId= await  findLastSemesterId() || (0).toString();
    let incremrntId=(Number(currentId)+1).toString().padStart(4,"0");
    incremrntId=`${payload.year}${payload.code}${incremrntId}`
    return  incremrntId
}