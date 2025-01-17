import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(`${process.env.DB_URL}sales&stocks`).then(()=>{
            console.log("Database connected");
        })
};

export default connectDB