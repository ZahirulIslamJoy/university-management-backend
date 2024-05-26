import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt"
import {
  Guardian,
  LocalGuardian,
  Student,
  StudentModels,
  UserName,
} from './student.interface';
import config from '../..';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true,"Name is required vai"],
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student,StudentModels>({
  id: { type: String , required:true , unique:true },
  password: { type: String},
  name: {
    type:userNameSchema,
    required:true,
  },
  gender: {
    type:String,
    enum:['male', 'female']
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup:{
    type:String,
    enum: {
      values:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:"{VALUE} is not supported"
    }
  },
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: {
    type:guardianSchema,
    required:true
  },
  localGuardian: {
    type:localGuradianSchema,
    required:true
  },
  profileImg: { type: String },
  isActive: {
    type:String,
    enum:['active', 'blocked'],
    default:"active"
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
}, {
  toJSON:{
    virtuals:true
  }
});


//virtual 
studentSchema.virtual("fullName").get(function (){
 return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName} ` })



studentSchema.pre("save",async function (next){
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password=await bcrypt.hash(user.password,Number(config.salt));
next();
})

studentSchema.post("save",function (doc,next){
  console.log(doc)
  doc.password="";
  next();
})

studentSchema.pre("find", function(next){
  this.find({isDeleted : {$ne:true}})
  next()
})

studentSchema.pre("findOne", function(next){
  this.find({isDeleted : {$ne:true}})
  next()
})


studentSchema.pre("aggregate", function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next()
})










studentSchema.statics.isExists=async function(id:string){
  const existingUser= await StudentModel.findOne({id});
  return existingUser;
}

export const StudentModel = model<Student,StudentModels>('Student', studentSchema);