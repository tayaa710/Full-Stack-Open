import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'
import blogService from '../services/blogs'

const blog = {
  id: '1',
  title: 'Test blog',
  url: 'Test URL',
  likes: 0,
  author: 'John Doe',
  user: { id: '123', name: 'Test User' }
}

describe('<Blog />', () => {
  test('renders title but not other details by default', () => {
    render(<Blog blog={blog} setBlogs={() => {}} blogs={[]} user={{ id: '123' }} />)

    expect(screen.getByText('Test blog')).toBeInTheDocument()

    expect(screen.queryByText('Test URL')).not.toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    const likeElements = screen.queryAllByText((content, element) =>
      element.textContent.includes('Likes:') && element.textContent.includes('0')
    )
    const visibleLikes = likeElements.filter(el => el.offsetParent !== null)
    expect(visibleLikes.length).toBe(0)
  })

  test("shows URL, likes, and author when the 'view details' button is clicked", async () => {
    const user = userEvent.setup()
    render(<Blog blog={blog} setBlogs={() => {}} blogs={[]} user={{ id: '123' }} />)
    expect(screen.queryByText('Test URL')).not.toBeInTheDocument()
    const viewButton = screen.getByText('view details')
    await user.click(viewButton)
    expect(screen.getByText('Test URL')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    const likesLabel = screen.getByText('Likes:')
    const likesContainer = likesLabel.parentElement
    expect(likesContainer).toHaveTextContent('Likes: 0')
  })

  test('calls the like event handler twice when the like button is clicked twice', async () => {
    const user = userEvent.setup()
    const mockLikeHandler = vi.fn()
    vi.spyOn(blogService, 'updateBlog').mockImplementation(async (updatedBlog) => {
      mockLikeHandler()
      return { ...updatedBlog, likes: updatedBlog.likes + 1 }
    })

    render(
      <Blog
        blog={blog}
        setBlogs={() => {}}
        blogs={[blog]}
        user={{ id: '123' }}
        handleLike={mockLikeHandler}
      />
    )
    const viewButton = screen.getByText('view details')
    await user.click(viewButton)
    const likeButtons = screen.getAllByText('❤️')
    const likeButton = likeButtons[0]
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})