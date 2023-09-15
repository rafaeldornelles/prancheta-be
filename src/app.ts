import express from "express"
import { userRouter } from "./routes/user.routes"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/user", userRouter)