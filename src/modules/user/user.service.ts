import mongoose from 'mongoose';
import config from '../../app/config';
import { AcademicSemester } from '../academicSemester/acadenicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.models';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDb = async (password: string, student: Student) => {
  password = password || (config.pass as string);
  const user: Partial<TUser> = {};


  //find academic semester info
  const admissionSemester= await AcademicSemester.findById(student.admissionSemester);

  const session=await mongoose.startSession();

  try{
    session.startTransaction();
    if(admissionSemester){
      user.id = await generateStudentId(admissionSemester)
    }
    user.password = password;
    user.role = 'student';

    //transaction-1
    const newUser = await User.create([user],{session});
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST,"Failed to Create User")
    }
      student.id = newUser[0].id;
      student.user = newUser[0]._id; // referencing
      //transaction-2
      const result = await StudentModel.create([student],{session});
      if(!result){
        throw new AppError(httpStatus.BAD_REQUEST,"Failed to Create Student")
      }
         await session.commitTransaction();
         await session.endSession();
      return result;
  }catch(err){
    await session.abortTransaction();
    await session.endSession();
  }

}

export const UserServices = {
  createStudentIntoDb,
};
