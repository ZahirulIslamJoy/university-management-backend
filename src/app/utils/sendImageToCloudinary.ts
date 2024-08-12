import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
export const sendImageToCloudinary = async()=>{
     // Configuration
     cloudinary.config({ 
        cloud_name: 'dteuoazet', 
        api_key: '527121792115183', 
        api_secret: config.cloudinary_key
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })