import mongoose from 'mongoose';
import config from '../../app/config';
import { AcademicSemester } from '../academicSemester/acadenicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.models';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { academicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';

const createStudentIntoDb = async (password: string, student: Student) => {
  password = password || (config.defaultPass as string);
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
    user.email = student.email;

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPass as string);

  //set student role
  userData.role = 'faculty';

  userData.email = payload.email;

  // find academic department info
  const academicDepartments = await academicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartments) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPass as string);

  //set student role
  userData.role = 'admin';

  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await StudentModel.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};



export const UserServices = {
  createStudentIntoDb,createFacultyIntoDB,createAdminIntoDB , getMe
};
