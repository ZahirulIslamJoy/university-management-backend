import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./acadenicSemester.model";

const createAcademicSemesterIntoDB= async (payload : TAcademicSemester )=>{
    const result = await  AcademicSemester.create(payload);
    return result;
}


export const AcademicSemesterServices= {
    createAcademicSemesterIntoDB
}