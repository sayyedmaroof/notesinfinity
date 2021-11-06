import express from 'express'
import Note from '../models/Notes.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// @desc Create new user note
// @route POST '/api/notes/create'
// @access Private
router.post('/create', auth, async (req, res) => {
  const note = new Note({
    ...req.body,
    user: req.user._id,
  })
  try {
    await note.save()
    res.status(201).json(note)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// @desc Fetch user notes
// @route GET '/api/notes/mynotes'
// @access Private

router.get('/mynotes', auth, async (req, res) => {
  try {
    // await req.user.populate('notes') : this was the previous code but to refactor and add filter and pagination we had to comment out this line and written the newest code as follows
    let searchQuery = ''
    if (req.query.keyword) {
      searchQuery = String(req.query.keyword)
    }
    const findQuery = {
      $and: [
        { user: req.user._id },
        {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { description: { $regex: searchQuery, $options: 'i' } },
            { tag: { $regex: searchQuery, $options: 'i' } },
          ],
        },
      ],
    }
    const notes = await Note.find(findQuery)
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort('-createdAt')

    const results = await Note.find(findQuery)

    const data = { notes, totalResults: results.length }
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// @desc Fetching an individual note by its id
// @route GET '/api/notes/mynotes/:id'
// @access Private
router.get('/mynotes/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
    if (!note) {
      return res.status(404).json({ error: 'Could not find note!' })
    }
    res.json(note)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// @desc Update a user note
// @route PATCH '/api/notes/mynotes/:id'
// @access Private
router.patch('/mynotes/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'description', 'tag']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' })
  }
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id })
    if (!note) {
      return res.status(404).json({ error: 'Could not find note!' })
    }
    updates.forEach(update => (note[update] = req.body[update]))
    await note.save()
    res.json(note)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// @desc Delete a user note
// @route DELETE '/api/notes/mynotes/:id'
// @access Private
router.delete('/mynotes/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!note) {
      return res.status(404).json({ error: 'Could not find note!' })
    }
    res.json(note)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
