import config from '../../app/config';
import { AcademicSemester } from '../academicSemester/acadenicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.models';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDb = async (password: string, student: Student) => {
  password = password || (config.pass as string);
  const user: Partial<TUser> = {};


  //find academic semester info
  const admissionSemester= await AcademicSemester.findById(student.admissionSemester);
  if(admissionSemester){
    user.id = await generateStudentId(admissionSemester)
  }
  user.password = password;
  user.role = 'student';
  const newUser = await User.create(user);
  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id; // referencing
    const result = await StudentModel.create(student);
    return result;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
