const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const assert = require('node:assert')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

beforeEach(async () => {
  await User.deleteMany({})
  
  const userObject = new User(helper.userToLogin)
  await userObject.save()})
  

describe("POST user", () => {
  test("Users are added correctly", async () => {
    const existingUsers = [await helper.userInDb()]

    const newUser = { username: 'TestUser', password: "abcdefghijklmnopqrstuvwxyz1234567890", name: "Name" }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const updatedExistingUsers = await User.find({})
    console.log(updatedExistingUsers)
    const usernames = updatedExistingUsers.map(user => user.username)
    console.log("sdfgsdrdfgsdfgs", usernames)


    assert.strictEqual(existingUsers.length + 1, updatedExistingUsers.length)

    assert(usernames.includes(newUser.username))

  })

  test("Username already exists handled correctly", async () => {
    const existingUsers = [await helper.userInDb()]

    const newUser = { username: 'tayaa710', password: "abcdefghijklmnopqrstuvwxyz1234567890", name: "Name" }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const updatedUsers = await User.find({})
    assert.strictEqual(existingUsers.length, updatedUsers.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})