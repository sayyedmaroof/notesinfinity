import express from 'express'
import User from '../models/User.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// @desc Register a new user
// @route POST '/api/users/register'
// @access Public
router.post('/register', async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
      throw new Error('Email already taken!')
    }
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// @desc Login user
// @route POST '/api/users/login'
// @access Public
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).json({ user, token })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// @desc Loging out a user
// @route POST '/api/users/logout'
// @access Private
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.json()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// @desc Loging out a user from all sessions
// @route POST '/api/users/logoutall'
// @access Private
router.post('/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.json()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// @desc Read user profile
// @route GET '/api/users/me'
// @access Private
router.get('/me', auth, (req, res) => {
  res.json(req.user)
})

// @desc Update user profile
// @route PATCH '/api/users/me'
// @access Private
router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' })
  }

  updates.forEach(update => (req.user[update] = req.body[update]))
  try {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
      throw new Error('Email already taken!')
    }
    await req.user.save()
    res.json(req.user)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// @desc Delete user profile with all the user notes
// @route DELETE '/api/users/me'
// @access Private
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
