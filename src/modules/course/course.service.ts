import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import QueryBuilder from '../../bulilder/QueryBuilder';

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


const updateCourseIntoDB = async (id:string,payload: TCourse) => {
    const {preRequisiteCourses,...remaingCourseData}=payload;

    //check if any preRequisit course to delete
    if(preRequisiteCourses && preRequisiteCourses.length>0){
        const deletePrerequisit= preRequisiteCourses.filter(elem => elem.course && elem.isDeleted).map(elem=>elem.course)
        const deletePrerequisitCoure=await Course.findByIdAndUpdate(
            id,
            {
                $pull:{preRequisiteCourses:{course : {$in: deletePrerequisit} }}
            }
        )
    }

  
    const result = await Course.findByIdAndUpdate(id,remaingCourseData,{new:true})
    return result;
  };



export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB
}