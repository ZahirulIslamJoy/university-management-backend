import nodemailer from "nodemailer"

export const SendEmail =async (to:string , html: string )=>{
    
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
   // secure: config.NODE_ENV==="production",
   secure:false,
    auth: {
      user: "codemen.zahiruljoy@gmail.com",
      pass: "racr bhti xfch gfwk",
    },
  });

   await transporter.sendMail({
    from: 'codemen.zahiruljoy@gmail.com', // sender address
    to,
    subject: "Reset Your Password", 
    text: "Please Reset Your Password Within 10 min",
    html, 
  });





}