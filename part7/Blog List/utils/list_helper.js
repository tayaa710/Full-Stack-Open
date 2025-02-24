const lodash = require('lodash')
const dummy = (blogs) => {
  return 1
}



const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)

}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const maxLikes = blogs.reduce(
      (currentMax, currentValue) => (currentMax.likes >= currentValue.likes) ? currentMax : currentValue, blogs[0]
    )

    return maxLikes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const groupedBlogs = lodash.groupBy(blogs, 'author')
  let maxBlogs = 0
  let maxAuthor = null
  for (let author in groupedBlogs) {
    const authorBlogNumber = groupedBlogs[author].length
    if (authorBlogNumber > maxBlogs) {
      maxBlogs = authorBlogNumber
      maxAuthor = author
    }
  }
  return ({
    author: maxAuthor,
    blogs: maxBlogs
  })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  let mostLikesForAuthor = 0
  let authorWithMostLikes = null
  const groupedBlogs = lodash.groupBy(blogs, 'author')
  for (let author in groupedBlogs) {
    const totalLikesForAuthor = groupedBlogs[author].reduce((accumulator, blog) => accumulator + blog.likes, 0)
    if (totalLikesForAuthor > mostLikesForAuthor){
      mostLikesForAuthor = totalLikesForAuthor
      authorWithMostLikes = author
    }
  }

  return({
    author: authorWithMostLikes,
    likes: mostLikesForAuthor
  })
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}