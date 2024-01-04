import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favourites: [{type: mongoose.Schema.Types.ObjectId  , ref: "recipes"}]
},
    {
        timestamps: true
    }
)


export const User = mongoose.model("User", userSchema)