import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import khaltiRoutes from "./routes/khaltiRoutes.js"
import connectCloudinary from "./config/cloudinary.js"
import connectDB from "./config/mongodb.js"

dotenv.config();
connectCloudinary(); //cloudinary
connectDB();         //mongoDB

const app=express();
const port=process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded()); 
app.use(cors());

app.use("/api/khalti",khaltiRoutes);


app.listen(port,()=>{
    console.log(`Server is running on the PORT ${port}`)
})

