import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dteuoazet',
  api_key: '527121792115183',
  api_secret: config.cloudinary_key,
});

export const sendImageToCloudinary = async (fileName: string, path: string) => {
 try{
    const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: fileName,
    })
    fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File is deleted.');
        }
      });
    return uploadResult
 }
 catch(err){
    console.log(err)
 }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
