/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
    id:string;
    password:string;
    needsPasswordChange:boolean;
    role:"student" | "admin" | "faculty";
    status:"in-progress" | "blocked";
    isDeleted:boolean;
}


export interface UserModel extends Model<TUser> {
    //myStaticMethod(): number;
    isUserExistsByCustomId(id : string): Promise<TUser> ,
    isPasswordMatched(userPassword : string , hashPassWord: string) : boolean
  }