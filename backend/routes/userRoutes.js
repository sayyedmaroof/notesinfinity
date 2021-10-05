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
      throw new Error('Error: Email already taken!')
    }
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// @desc Login a user
// @route POST '/api/users/login'
// @access Public
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).json({ user, token })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// @desc Login a user
// @route POST '/api/users/login'
// @access Public
router.get('/me', auth, (req, res) => {
  res.send(req.user)
})

export default router
