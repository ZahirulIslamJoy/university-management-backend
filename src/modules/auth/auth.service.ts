import httpStatus from "http-status";
import AppError from "../../app/errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../app/config";

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

    export const AuthServices = {
        loginUser,
        // changePassword,
        // refreshToken,
      };