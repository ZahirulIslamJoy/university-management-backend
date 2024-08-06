import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config";
import bcrypt from "bcrypt"

const loginUser = async (payload: TLoginUser) => {
    //checking if the user is exist
   const user = await User.isUserExistsByCustomId(payload.id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
  
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
  
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //Creating a acces token and sent to the client


    const tokenData = {
        userId : user?.id ,
        role : user?.role
    }

    //console.log()

    const accessToken = jwt.sign({
        data: tokenData
      }, config.acessToken as string, { expiresIn: '10d' });

      return {
        accessToken ,
        needsPasswordChange: user?.needsPasswordChange,
      }
}



const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
  ) => {
    // checking if the user is exist
    const user = await User.isUserExistsByCustomId(userData?.data?.userId);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
  
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
  
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    //checking if the password is correct
  
    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.salt),
    );
  
    await User.findOneAndUpdate(
      {
        id: userData.data?.userId,
        role: userData?.data?.role,
      },
      {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
      },
    );
  
    return null;
  };
    export const AuthServices = {
        loginUser,
        changePassword,
        // refreshToken,
      };