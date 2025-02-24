const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const Test = require('supertest/lib/test')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const userObject = new User(helper.userToLogin)
  const result = await userObject.save()
  
  for (let blog of helper.initialBlogs) {
    blog.author = result._id.toString()
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('HTML Backend Blog Tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct number of blogs', async () => {
    const response = await api.get('/api/blogs').expect(200)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('Check id instead if _id', async () => {

    const response = await helper.blogsInDb()
    assert.strictEqual(response[0]._id, undefined)
  })

  test.only('POSTing without a token fails with 401', async () => {
    const user = await helper.userInDb()
    const newBlog = {
      title: 'POST test',
      author: user.id,
      url: 'test.com',
      likes: 9999
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('HTTP POST sucessfully works', async () => {
    const user = await helper.userInDb()
    const token = helper.logIn(user)
    
    const newBlog = {
      title: 'POST test',
      author: user.id,
      url: 'test.com',
      likes: 9999
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(blog => blog.title)

    assert.strictEqual(contents.length, helper.initialBlogs.length + 1)
    assert(contents.includes('POST test'))

  })

  test('Likes defaults to 0', async () => {
    const user = await helper.userInDb()
    const token = helper.logIn(user)

    const newBlogNoLikes =  {
      title: 'POST test',
      author: user.id,
      url: 'test.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoLikes)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs')
    
    const postedBlog = response.body.filter(blog => blog.title === newBlogNoLikes.title)[0]
    assert.strictEqual(postedBlog.likes, 0)
  })

  test('No url causes 400 bad request', async () => {
    const user = await helper.userInDb()
    const token = helper.logIn(user)
    const newBlogNoUrl = {
      title: 'POST test',
      author: user.id,
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('No title causes 400 bad request', async () => {
    const user = await helper.userInDb()
    const token = helper.logIn(user)
    const newBlogNoTitle = {
      author: user.id,
      url: 'test.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  describe("deletion of a blog", () => {
    test("deletion succeeds with status code of 204 if id is valid", async () => {
      const user = await helper.userInDb()
      const token = helper.logIn(user)
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const contents = blogsAtEnd.map(blog => blog.title)
      assert(!contents.includes(blogToDelete.title))
    })

    test("responds with status code of 400 if id is invalid", async () => {
      const invalidId = 1

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe("updating a blog", () => {
    test("Updating succeds if id is valid", async () => {
      const user = await helper.userInDb()
      const token = helper.logIn(user)
      const modifiedTest = {
        title: 'test 1 updated',
        author: user.id,
        url: 'test.com',
        likes: 100000
      }

      const currentBlogs = await helper.blogsInDb()
      const blogToModify = currentBlogs[0]

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(modifiedTest)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const updatedBlogs = await helper.blogsInDb()
      assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length)

      assert.strictEqual(updatedBlogs[0].likes, modifiedTest.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})