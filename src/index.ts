import express from "express";
import userRouter from "./routes/user";
import router from "./routes/todos";
import { userMiddleware } from "./middleware";
import cors from "cors"

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use("/todos", userMiddleware, router)

app.listen(PORT, ()=> {console.log("server is running")})