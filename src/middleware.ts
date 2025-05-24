import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_KEY } from "./config";

export const userMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers["authorization"];
    if (!token){
        res.json({
            message : "bad request"
        })
        return;
    }
    const decoded = jwt.verify(token as unknown as string, JWT_KEY)
    //@ts-ignore
    console.log(decoded)
    if (decoded) {
        //@ts-ignore
        req.id = decoded.id
        //@ts-ignore
        console.log(req.id)
        next()
    }
}