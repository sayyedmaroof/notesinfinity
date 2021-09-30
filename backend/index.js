import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import notesRoutes from './routes/notesRoutes.js'

const app = express()

dotenv.config()
connectDB()

// middleware
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/notes', notesRoutes)

app.get('/', (req, res) => res.send('Hello world this is my home page'))

app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT}`)
)
