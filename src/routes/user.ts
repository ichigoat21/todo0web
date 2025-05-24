import express from "express";
import models from "../server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config";



const userRouter = express.Router();

userRouter.post("/signup", async (req, res)=>{
    
   const username = req.body.username;
   const password = req.body.password;

   const hashedPassword = await bcrypt.hash(password, 5)

   await models.userModel.create({
    username : username, 
    password : hashedPassword
   })

   res.json({
    message : "you are signed up"
   })
})

userRouter.post("/signin", async (req, res)=> {
    const username = req.body.username;
    const pass = req.body.password

    const response = await models.userModel.findOne({
        username : username
    })
    if (!response) {
        res.status(403).json({
            message : "something went wrong"
        })
    }

    //@ts-ignore
    const password = await bcrypt.compare(pass, response?.password)

    
    if (!password){
        res.json("wrong pass ")
    } else {
        const token = jwt.sign({
            //@ts-ignore
            id : response._id
        }, JWT_KEY)
        res.status(200).json({
            token
        })
    }
})


export default userRouter