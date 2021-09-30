import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// Create new user : '/api/users' ,  Doesn't require auth
router.post('/', async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
      throw new Error('Error: Email already taken!')
    }
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.get('/', (req, res) => {
  res.send('this is the user route')
})

export default router
