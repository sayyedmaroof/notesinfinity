import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Note from './Notes.js'

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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Setting up a virtual property to create relationship between user and notes
userSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'user',
})

// Defining function for hiding private data of users
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

// generating authentication token and saving to the database
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// Logging in user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login!')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login!')
  }
  return user
}

// hashing password before saving the user
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

// deleting the user notes when the user profile deletion
userSchema.pre('remove', async function (next) {
  await Note.deleteMany({ user: this._id })
  next()
})

// creating mongoose model for User collection
const User = mongoose.model('User', userSchema)

export default User
