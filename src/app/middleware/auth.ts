import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../../modules/user/user.interface';
import { User } from '../../modules/user/user.model';

const auth = (...accessRole : TUserRole[]) => {
  return catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const  token = req.headers.authorization;
    //console.log(token)
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized!")
    }
        const decoded = jwt.verify(token, config.acessToken as string) as JwtPayload;
        const currentRole=decoded?.data?.role
        const user = await User.isUserExistsByCustomId(decoded?.data?.userId);
        
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


        if (
            user.passwordChangedAt &&
            User.isJWTIssuedBeforePasswordChanged(
              user.passwordChangedAt,
              decoded.iat as number,
            )
          ) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
          }

      
        if(accessRole && !accessRole.includes(currentRole)){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorizedS!")
        }
        req.user  = decoded as JwtPayload
        next()
     
     
  });
};

export default auth;
