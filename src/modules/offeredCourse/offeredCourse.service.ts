import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { academicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferdCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment: acacademicDepartments,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

    /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */

  //check if the semester registration is valid or not
  const isSemesterRegistrationValid =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationValid) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration Isnt Valid',
    );
  }

  const academicSemester = isSemesterRegistrationValid?.academicSemester;
  const isAcademicFacultyValid =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyValid) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty Isnt Valid');
  }

  const isAcademicDepartmentValid = await academicDepartment.findById(
    acacademicDepartments,
  );

  if (!isAcademicDepartmentValid) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department Isnt Valid');
  }

  const isCourseValid = await Course.findById(course);

  if (!isCourseValid) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Isnt Valid');
  }

  const isFacultyValid = await Faculty.findById(faculty);

  if (!isFacultyValid) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty Isnt Valid');
  }

  //department and faculty validation
  const departmentAndFacultyValid =
    isAcademicDepartmentValid?.academicFaculty.equals(isAcademicFacultyValid._id) ;
  if (!departmentAndFacultyValid) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentValid.name} is not belongs to ${isAcademicFacultyValid.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  //checking the time confliction a faculty

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }


  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const offeredCourseServices = {
  createOfferdCourseIntoDB,
};
