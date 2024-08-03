import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { AcademicSemester } from "../academicSemester/acadenicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB=async(payload:TSemesterRegistration)=>{

    const academicSemester=payload?.academicSemester;
    //check if the academic semester is valid or not
    const isValid= await AcademicSemester.findById(academicSemester);
    if(!isValid){
        throw new AppError(httpStatus.NOT_FOUND,"Invalid Academic Semester Id")
    }

    //check if the academic semester is already exists
    const isExist=await SemesterRegistration.findOne({academicSemester})
    if(isExist){
        throw new AppError(httpStatus.CONFLICT,"This Semester is already registered")
    }


    const result = await SemesterRegistration.create(payload);
    return result;


}






export const SemesterRegistrationServices={
    createSemesterRegistrationIntoDB
}