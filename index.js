import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/usersRoutes.js';
const app = express();


app.use(express.json());
dotenv.config();
app.use(cookieParser());
connectDB();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));

app.get('/',(req,res)=>{
    res.send("hello from server")
})

app.use('/user',userRouter)

app.listen(4000,()=>{
    console.log("server is running on : http://localhost:4000");
})