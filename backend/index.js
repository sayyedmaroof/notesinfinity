import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import notesRoutes from './routes/notesRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express()

dotenv.config()
connectDB()

// middleware
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/notes', notesRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

// error handling
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT}`)
)
