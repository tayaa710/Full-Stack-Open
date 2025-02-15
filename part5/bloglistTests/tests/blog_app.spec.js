const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('api/testing/reset')
    await request.post('api/users', {
      data: {
        name: 'test',
        username: 'test',
        password: 'test'
      }
    })

    await request.post('api/users', {
      data: {
        name: 'test2',
        username: 'test2',
        password: 'test2'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'test')
      await expect(page.getByText('Logged in as test')).toBeVisible()
      await expect(page.getByText('logout')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrongPass')
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })
  })

  describe('Once Logged In', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test blog', 'test')
      await expect(page.getByText('A new blog test blog by test has been added')).toBeVisible()
      await expect(page.getByRole('button', { name: 'view details' })).toBeVisible()
    })

    describe('Once a blog has been added', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'First Added - Least liked', 'test')
        await createBlog(page, 'Middle Added - Middle liked', 'test')
        await createBlog(page, 'Last Added - First liked', 'test')
      })

      test('Blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view details' }).first().click()
        await expect(page.getByText('Likes: 0')).toBeVisible()
        await page.getByRole('button', { name: '❤️' }).click()
        await page.getByText('Likes: 1').waitFor()
        await expect(page.getByText('Likes: 1')).toBeVisible()


      })

      test('Blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view details' }).first().click()
        page.on('dialog', async dialog => {

          expect(dialog.type()).toBe('confirm')
          expect(dialog.message()).toContain('Are you sure you want to delete')
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'delete' }).click()


        await expect(page.getByRole('button', { name: 'hide detail' })).not.toBeVisible()
      })

      test('Only user who made the post can delete', async ({ page }) => {
        await page.getByRole('button', { name: 'view details' }).first().click()
        await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()

        await loginWith(page, 'test2', 'test2')
        await page.getByRole('button', { name: 'view details' }).first().click()
        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      test('Blogs are ordered by likes', async ({ page }) => {
        const last = await page.getByText('Last Added').last().locator('..')
        await last.getByRole('button', { name: 'view details' }).click()
        await page.getByRole('button', { name: '❤️' }).click()
        await page.getByRole('button', { name: '❤️' }).click()
        await page.getByText('Likes: 1').waitFor()
        await page.getByRole('button', { name: '❤️' }).click()
        await page.getByText('Likes: 2').waitFor()
        await page.getByRole('button', { name: 'hide detail' }).click()

        const middle = await page.getByText('Middle Added').locator('..')
        await middle.getByRole('button', { name: 'view details' }).click()
        await page.getByRole('button', { name: '❤️' }).click()
        await page.getByText('Likes: 1').waitFor()
        await page.getByRole('button', { name: 'hide detail' }).click()

        await expect(page.getByTestId('blogTitle').first()).toHaveText('Last Added - First liked')
        await expect(page.getByTestId('blogTitle').nth(1)).toHaveText('Middle Added - Middle liked')
        await expect(page.getByTestId('blogTitle').nth(2)).toHaveText('First Added - Least liked')
      })
    })
  })
})