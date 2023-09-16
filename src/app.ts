import express from "express"
import { userRouter } from "./routes/user.routes"
import { handleError } from "./util/error.handler"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/user", userRouter)

app.use(handleError)