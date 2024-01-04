import express from "express";
import { User } from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const user = await User.findOne({ name })

    if (user) {
        res.json({ message: "User already exist! kindly login" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save();

        res.json(user)
    } catch (error) {
        console.error(error);
    }

})


router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ user: false })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.json({ user: false })
        }

        const payload = {
            // name: user.name,
            // email: user.email
            id: user._id
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY)
        // res.cookie("user_token", token)   /** not working */
        res.json({ token: token, userId: user._id, userName: user.name })
    } catch (error) {
        console.log(error);
    }

})


export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    // console.log(token);
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err) => {
            if (err) return res.sendStatus(403)
            /** can also send a message and display on screen instead of blank screen */
            next();
        });
    } else {
        res.sendStatus(401)
        /** can also send a message and display on screen instead of blank screen */
    }
}