import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../../modules/user/user.interface';

const auth = (...accessRole : TUserRole[]) => {
  return catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const  token = req.headers.authorization;
    //console.log(token)
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized!")
    }
    //checking if the token is valid or not 
    jwt.verify(token, config.acessToken as string , function(err, decoded) {
        if(err){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized!")
        }
        const currentRole=(decoded as JwtPayload)?.data?.role
        if(accessRole && !accessRole.includes(currentRole)){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized!")
        }
        req.user  = decoded as JwtPayload
        next()
      });
  });
};

export default auth;
