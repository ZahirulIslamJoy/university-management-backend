import { CourseSearchableFields } from './course.constant';
import { TCourse, TCoursefaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import QueryBuilder from '../../bulilder/QueryBuilder';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: TCourse) => {
  const { preRequisiteCourses, ...remaingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const basicCourseInfoUpdate = await Course.findByIdAndUpdate(
      id,
      remaingCourseData,
      { new: true, session },
    );
    if (!basicCourseInfoUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Update Course');
    }

    //check if any preRequisit course to delete
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePrerequisit = preRequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted)
        .map((elem) => elem.course);
      const deletePrerequisitCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletePrerequisit } },
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!deletePrerequisitCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Update Course');
      }

      const newPrerequisit = preRequisiteCourses.filter(
        (elem) => elem.course && !elem.isDeleted,
      );
      const newPrerequisitCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrerequisit } },
        },
        {
          new: true,
          session,
        },
      );

      if (!newPrerequisitCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Update Course');
      }
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    return result;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed To Update Course');
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

const getFacultiesWithCourseFromDB = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    'faculties',
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
  getFacultiesWithCourseFromDB,
};
