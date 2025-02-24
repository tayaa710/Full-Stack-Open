const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes, author } = request.body
  const user = request.user



  const blog = new Blog({
    title,
    user: user._id,
    url,
    likes,
    author: user.name
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  console.log(user)

  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  if (blog.user.toString() === user.id.toString()) {
    await blog.deleteOne()
    return response.status(204).end()
  }else{
    return response.status(401).json({ error: "You do not have permission to change this blog" })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  console.log("updated blog", updatedBlog)
  response.json(updatedBlog)
})
module.exports = blogsRouter