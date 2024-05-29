import express from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/config/modules/student/student.route';

const app = express();
//const port = 3000

//
app.use(express.json());
app.use(cors());


//application routes
app.use("/api/v1/students",StudentRoutes)

export default app;
