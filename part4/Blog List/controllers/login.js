const jwt = require('jsonwebtoken')
const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCheck = user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(passwordCheck && user)) {
    response.status(401).json({
      error: "invalid username or password"
    })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, id: user._id })
})

module.exports = loginRouter