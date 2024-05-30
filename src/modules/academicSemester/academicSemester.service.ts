import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./acadenicSemester.model";

const createAcademicSemesterIntoDB= async (payload : TAcademicSemester )=>{

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code ){
        throw new Error("Invalid Code")
    }

    const result = await  AcademicSemester.create(payload);
    return result;
}


export const AcademicSemesterServices= {
    createAcademicSemesterIntoDB
}