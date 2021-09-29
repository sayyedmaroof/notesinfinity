import expres from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
connectDB()

const app = expres()

app.get('/', (req, res) => {
  res.send('Hello world this is my home page')
})

app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT}`)
)
