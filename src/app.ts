import express from 'express';
import cors from 'cors';
import handleError from './app/middleware/globalErrorHandling';
import notFound from './app/middleware/notFound';
import router from './app/route/routes';

const app = express();
//const port = 3000

//
app.use(express.json());
app.use(cors());


//application routes
app.use("/api/v1",router)
app.use(handleError);
app.use(notFound);

export default app;
