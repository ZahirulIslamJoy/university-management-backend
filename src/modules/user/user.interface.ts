/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    id:string;
    password:string;
    needsPasswordChange:boolean;
    passwordChangedAt?: Date;
    role:"student" | "admin" | "faculty";
    status:"in-progress" | "blocked";
    isDeleted:boolean;
}


export interface UserModel extends Model<TUser> {
    //myStaticMethod(): number;
    isUserExistsByCustomId(id : string): Promise<TUser> ,
    isPasswordMatched(userPassword : string , hashPassWord: string) : Promise<boolean>,
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
      ): boolean;
  }

  export type TUserRole = keyof typeof USER_ROLE;