const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, url) => {
  await page.getByRole('button', { name: '➕ New Blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: '➕ Create' }).click()
  const blogCount = await page.getByTestId('blogTitle').count()
  await page.waitForTimeout(500);
  await page.getByTestId('blogTitle').nth(blogCount - 1).waitFor()
}

export { loginWith, createBlog }