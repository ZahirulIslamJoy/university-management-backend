import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { AcademicSemester } from "../academicSemester/acadenicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../bulilder/QueryBuilder";
import { semesterRegistrationStatuss } from "./semesterRegistration.constant";

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

    //check is there any semester Registration is upcoming or ongoing
    const checkUpcomingOrOngoing= await SemesterRegistration.findOne({
        $or : [
            {status:semesterRegistrationStatuss.UPCOMING},
            {status:semesterRegistrationStatuss.ONGOING}
        ]
    })

    if(checkUpcomingOrOngoing){
        throw new AppError(httpStatus.BAD_REQUEST,`There is already a ${checkUpcomingOrOngoing?.status} semester`)
    }


    const result = await SemesterRegistration.create(payload);
    return result;

}


const getAllSemesterRegistrationsFromDB = async (
    query: Record<string, unknown>,
  ) => {
    const semesterRegistrationQuery = new QueryBuilder(
      SemesterRegistration.find().populate('academicSemester'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
  };
  
  const getSingleSemesterRegistrationsFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id);
  
    return result;
  };






export const SemesterRegistrationServices={
    createSemesterRegistrationIntoDB,getAllSemesterRegistrationsFromDB,getSingleSemesterRegistrationsFromDB
}