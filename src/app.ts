import express from "express"
import { userRouter } from "./routes/user.routes"
import { handleError } from "./middleware/error.handler"
import { verifyToken } from "./middleware/verify.middleware"
import { projectRouter } from "./routes/project.routes"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/user", userRouter)

app.use(verifyToken)
app.use("/project", projectRouter)

app.use(handleError)