import mongoose from 'mongoose'

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to database!'))
    .catch(e => console.log('Could not connect to database!', e.message))
}
export default connectDB
