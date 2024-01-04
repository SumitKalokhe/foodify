import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    imgUrl: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    ownerName: {type: String}
})

export const Recipe = mongoose.model("Recipe", recipeSchema)