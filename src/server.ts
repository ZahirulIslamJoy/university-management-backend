import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import seedSuperAdmin from './app/db';


let server:Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    seedSuperAdmin()
    server=app.listen(config.port, () => {
      console.log(`Example app listening  port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

//asynchoronous tasks
process.on("unhandledRejection",()=>{
  console.log("unhandledRejection Found,server is shutting down")
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  else{
    process.exit(1)
  }
})

//synchoronus tasks
process.on("uncaughtException",()=>{
  console.log("uncaughtException Found,server is shutting down")
  process.exit(1)
})
