import experess from "express"
import { Recipe } from "../model/recipeModel.js"
import { User } from "../model/userModel.js";
import { verifyToken } from "./userRouter.js";


const router = experess.Router();

// this route is to get all recipes from recipe database
router.get("/", async (req, res) => {

    try {
        const response = await Recipe.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }

})

// this route is to add recipe to database
router.post("/", verifyToken , async (req, res) => {

    try {
        const recipe = new Recipe(req.body)
        const response = await recipe.save()
        res.json(response)

    } catch (error) {
        res.json(error)
    }
})

// this route is to add recipe to users favourite section in usersdatabase
router.put("/", verifyToken ,async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.body.recipeId)
        const user = await User.findById(req.body.userId)

        user.favourites.push(recipe)
        await user.save()
        res.json({ favourites: user.favourites })

    } catch (error) {
        res.json(error)
    }

})

//this route is to get all favourite recipes from users database
router.get("/favourites/id/:id", verifyToken, async (req, res) => {

    const {id}= req.params
    try {
        const user = await User.findById(id)
        const favourites= await Recipe.find({ _id : {$in: user.favourites}})

        res.json({ favourites})

    } catch (error) {
        res.json(error)
    }

})

// this request is to get single recipe detail
router.get("/:id",async (req, res) => {
    const {id}= req.params
    
    try {
        const recipe = await Recipe.findById(id)
        
        res.json(recipe)
    } catch (error) {
        res.json(error)
    }
    
})



// working of this route is confusing
router.get("/favourites/:id", verifyToken, async(req, res)=>{
    const {id}= req.params

    try {
        const user= await User.findById(id)
        res.json({favouritedRecipe : user?.favourites})
        
    } catch (err) {
        res.json(err)
    }

})



export { router as recipeRouter };