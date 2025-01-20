import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/usersRoutes.js';
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
dotenv.config();
app.use(cookieParser());
connectDB();
app.use(cors({
    origin: 'http://localhost:5173' || 'https://sales-stock-one.vercel.app', 
    credentials: true, 
  }));

app.get('/',(req,res)=>{
    res.send("hello from server")
})

app.use('/user',userRouter)

app.listen(port,()=>{
    console.log(`server is running on : ${port}`);
})