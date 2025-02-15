const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'test',
        username: 'test',
        password: 'test'
      }
    })
    await page.goto('/')
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'test', 'wrongPass')
    await expect(page.getByText('wrong credentials')).toBeVisible()
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('test logged in')).not.toBeVisible()
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'test', 'test')
    await expect(page.getByText('test logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright', true)
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')

        await createNote(page, 'third note')
      })

      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator('..')

        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })
})