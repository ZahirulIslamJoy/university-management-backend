import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentId=(payload: TAcademicSemester)=>{
    const currentId=(0).toString();
    let incremrntId=(Number(currentId)+1).toString().padStart(4,"0");
    incremrntId=`${payload.year}${payload.code}${incremrntId}`
    return  incremrntId
}