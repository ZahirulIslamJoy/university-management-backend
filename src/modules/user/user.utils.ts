import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastSemesterId=async()=>{
    const lastStudent=await User.findOne({
        role:'student'
    },{
        id:1,
        _id:0
    }).sort({createdAt:-1}).lean()

    //return lastStudent?.id ? lastStudent.id.substring(6) : undefined
    return lastStudent?.id ? lastStudent.id : undefined
}


export const generateStudentId=async(payload: TAcademicSemester)=>{
    let currentId=  (0).toString();

    const laststudentId= await findLastSemesterId();
    const lastStudentYear=laststudentId?.substring(0,4);
    const lastStudentSemesterCode=laststudentId?.substring(4,6);
    const currentStudentYear=payload.year;
    const currentStudentSemesterCode=payload.code;

    if(laststudentId && lastStudentSemesterCode === currentStudentSemesterCode && currentStudentYear ===  lastStudentYear){
            currentId=laststudentId.substring(6)
    }

    let incremrntId=(Number(currentId)+1).toString().padStart(4,"0");
    incremrntId=`${payload.year}${payload.code}${incremrntId}`
    return  incremrntId
}