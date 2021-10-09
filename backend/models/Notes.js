import mongoose from 'mongoose'

const notesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
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
