import express from "express"

import { userRouter } from "./routes/user.routes"
import { handleError } from "./middleware/error.handler"
import { verifyToken } from "./middleware/verify.middleware"
import { projectRouter } from "./routes/project.routes"
import { briefingRouter } from "./routes/briefing.routes"
import { projectStepRouter } from "./routes/projectstep.routes"

export const app = express()
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerConfig = YAML.load("swagger-ui.yaml")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig))
app.use("/user", userRouter)

app.use("/project", projectRouter)
app.use("/briefing", briefingRouter)
app.use("/projectstep", projectStepRouter)

app.use(handleError)