import express from "express"
import { userRouter } from "./routes/user.routes"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/?", (req, res, next) => { res.send("Hello world")})
app.use("/user", userRouter)