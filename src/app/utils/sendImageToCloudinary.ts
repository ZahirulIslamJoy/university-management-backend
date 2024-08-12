import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
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