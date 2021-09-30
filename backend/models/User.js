import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      trim: true,
      validate(pass) {
        if (pass.toLowerCase().includes('password')) {
          throw new Error(
            'The password should not includes the word password itself'
          )
        }
      },
    },
    age: {
      type: Number,
      default: 18,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number')
        }
      },
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

export default mongoose.model('user', userSchema)
