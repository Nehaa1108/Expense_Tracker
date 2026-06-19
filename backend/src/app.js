import express from 'express'
import morgan from 'morgan'
import authRouter from './route/AuthRoute.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())

app.use(morgan('dev'))

//adding cookieparser for refersh token
app.use(cookieParser())

app.use("/api/auth",authRouter)
export default app