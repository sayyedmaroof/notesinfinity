import mongoose from 'mongoose'

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to database')
  })
}

export default connectDB
