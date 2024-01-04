import express from "express";
import cors from "cors";
import 'dotenv/config'
import mongoose from 'mongoose';
import {userRouter} from "./routes/userRouter.js"
import {recipeRouter} from "./routes/recipeRouter.js"

const app= express()

const PORT= process.env.PORT

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://sumitkalokhe:${process.env.MONGODB_PASS}@cluster0.hdvqvkj.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`);
  console.log("database connected successfully");
}

app.use(express.json())
app.use(cors())
app.use('/public', express.static('public'));
app.use("/auth", userRouter)
app.use("/recipes", recipeRouter)


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})
