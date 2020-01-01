const Blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return 'none'
    }
    
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return 'no blogs'
    }

    const authors = blogs.map(blog => blog.author)
    let blogsAmount = 1;
    let m = 0;
    let popularAuthor = authors[0]

    for (let i = 0; i < authors.length; i++) {
        for (let j = i; j < authors.length; j++) {
            if (authors[i] === authors[j]) m++;
            if (blogsAmount < m) {
                blogsAmount = m;
                popularAuthor = authors[i]
            }
        }

        m = 0;
    }
    const result =  {
        author: popularAuthor,
        amount: blogsAmount
    }

    return  result
}

const mostLikes = blogs => {
    if (blogs.length === 0) {
        const result2 = {
            author: '',
            likes: 0
        }
        return result2
    }

    let likesAmount = 0;
    let m = 0;
    let popularAuthor = blogs[0].author

    for (let i = 0; i < blogs.length; i++) {
        for (let j = i; j < blogs.length; j++) {
            if (blogs[i].author === blogs[j].author) m = m + blogs[j].likes;
            if (likesAmount < m) {
                likesAmount = m;
                popularAuthor = blogs[i].author
            }
        }

        m = 0;
    }
    const result =  {
        author: popularAuthor,
        likes: likesAmount
    }

    return  result
}

const totalLikes = blogs => {
    if (blogs.length === 0) {
        return 0
    }

    const likesArray = blogs.map(blog => blog.likes)
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    return likesArray.reduce(reducer)

}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}