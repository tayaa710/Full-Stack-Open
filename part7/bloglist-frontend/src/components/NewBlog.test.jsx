import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import NewBlog from './NewBlog'

test("Form calls event handler with correct details upon blog creation", async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<NewBlog setBlogs={createBlog} blogs={[]} setErrorMessage={() => {}} setSuccessMessage={() => {}} toggleVisibility={() => {}}/>)
  const titleInput = screen.getByPlaceholderText('Blog Name')
  const urlInput = screen.getByPlaceholderText('Blog Url')
  await user.type(titleInput, "My Test Blog")
  await user.type(urlInput, "http://example.com")

  const submitButton = screen.getByText('➕ Create')
  await user.click(submitButton)
  

  expect(createBlog.mock.calls).toHaveLength(1)
})