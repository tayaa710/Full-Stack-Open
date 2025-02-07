const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).select('username name id').populate('blogs',{title:1, likes:1, url:1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password){
    response.status(400).json({ error:"password required" })
  }

  if (body.password.length < 3){
    response.status(400).json({ error:"password must be at leaast 3 characters"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const newUser = new User({username: body.username, passwordHash, name:body.name})
  const result = await newUser.save()
  response.status(201).json(result)
})


module.exports = usersRouter