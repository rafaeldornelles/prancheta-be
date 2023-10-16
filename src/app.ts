import express from "express"
import { userRouter } from "./routes/user.routes"
import { handleError } from "./middleware/error.handler"
import { verifyToken } from "./middleware/verify.middleware"
import { projectRouter } from "./routes/project.routes"
import { briefingRouter } from "./routes/briefing.routes"
import { projectStepRouter } from "./routes/projectstep.routes"

export const app = express()
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerConfig = YAML.load("swagger-ui.yaml")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig))
app.use("/user", userRouter)

app.use("/project", verifyToken, projectRouter)
app.use("/briefing", verifyToken, briefingRouter)
app.use("/projectstep", verifyToken, projectStepRouter)

app.use(handleError)