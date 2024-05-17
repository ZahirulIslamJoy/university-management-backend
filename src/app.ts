import express from 'express';
import cors from 'cors';

const app = express();
//const port = 3000

//
app.use(express.json());
app.use(cors());

const a = 5;

app.get('/', (req, res) => {
  res.send(a);
});

export default app;
