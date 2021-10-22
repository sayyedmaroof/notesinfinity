import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import notesRoutes from './routes/notesRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express()

dotenv.config()
connectDB()

// middleware
app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/notes', notesRoutes)

// error handling
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT}`)
)
