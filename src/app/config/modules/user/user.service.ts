import config from "../..";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.models";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDb = async (password : string,student: Student) => {

    password = password || config.pass as string;
    const user:Partial<TUser> = {}

    user.id = "2030102031"
    user.password=password;
    user.role="student";

    const newUser= await User.create(user);
    if(Object.keys(newUser).length){
        student.id=newUser.id;
        student.user=newUser._id; // referencing
        const result = await StudentModel.create(student);
        return result;
    }
    
};

export const UserServices={
    createStudentIntoDb,
}