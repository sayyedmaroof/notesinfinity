import mongoose from 'mongoose'

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter title!'],
      minLength: [3, 'Title must be atleast 3 characters long'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter description!'],
      minLength: [5, 'Description must be atleast 5 characters long'],
      trim: true,
    },
    tag: {
      type: String,
      default: 'General',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Note = mongoose.model('Note', notesSchema)

export default Note
