const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')


let initialBlogs = [
  {
    title: 'test 1',
    url: 'test.com',
    likes: 2
  },
  {
    title: 'test 2',
    url: 'test.com',
    likes: 3
  },
]

const userToLogin = {
  username: "tayaa710",
  password: "testasdf",
  name: "test"
}

const logIn = (user) => {
  const userToken = {
    username: user.username,
    id: user.id
  }
return jwt.sign(userToken, process.env.SECRET)
}

const userInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())[0]
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}



module.exports = {
  initialBlogs, nonExistingId, blogsInDb, userInDb, userToLogin,logIn
}