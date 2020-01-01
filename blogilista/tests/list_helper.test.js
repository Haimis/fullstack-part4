const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes is right', () => {
    test('total likes are right when list is empty', () => {
    
        const blogs = []
    
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('total likes are right when only one blog', () => {
        const blogs= [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: "hyvä blogi",
                author: "hyvä bloggari",
                url: "abc",
                likes: 4,
                __v: 0
            }
        ]    
        
    
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(4)
    })

    test('total likes are right when many blogs', () => {
        
        const blog1 = new Blog({
            _id: '5a422aa71b54a676234d17f8',
            title: "hyvä blogi",
            author: "hyvä bloggari",
            url: "abc",
            likes: 4,
            __v: 0
        })    
        const blog2 = new Blog({
            _id: 'AFLm5ukezJOD4RagAVdtV2GhhjA',
            title: "paha blogi",
            author: "paha bloggari",
            url: "efg",
            likes: 2,
            __v: 0
        })
        const blogs = [blog1, blog2]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(6)
    })
})
describe('favourite blog', () => {
    test('favourite is right when list is empty', () => {
    
        const blogs = []
    
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toBe('none')
    })

    test('favourite blog is right when only one blog', () => {
        const blogs= [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: "hyvä blogi",
                author: "hyvä bloggari",
                url: "abc",
                likes: 2,
                __v: 0
            }
        ]    
        
    
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[0])
    })

    test('favourite blog is right when many blogs', () => {
        
        const blog1 = new Blog({
            _id: '5a422aa71b54a676234d17f8',
            title: "hyvä blogi",
            author: "hyvä bloggari",
            url: "abc",
            likes: 1,
            __v: 0
        })    
        const blog2 = new Blog({
            _id: 'AFLm5ukezJOD4RagAVdtV2GhhjA',
            title: "paha blogi",
            author: "paha bloggari",
            url: "efg",
            likes: 2,
            __v: 0
        })
        const blogs = [blog1, blog2]

        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[1])
    })

    test('favourite blog is right when many blogs with same amount of likes', () => {
        
        const blog1 = new Blog({
            _id: '5a422aa71b54a676234d17f8',
            title: "hyvä blogi",
            author: "hyvä bloggari",
            url: "abc",
            likes: 4,
            __v: 0
        })    
        const blog2 = new Blog({
            _id: '5e093ad95bc21a0967f98f7f',
            title: "joku blogi",
            author: "joku bloggari",
            url: "aij",
            likes: 2,
            __v: 0
        })
        const blog3 = new Blog({
            _id: 'AFLm5ukezJOD4RagAVdtV2GhhjA',
            title: "paha blogi",
            author: "paha bloggari",
            url: "efg",
            likes: 4,
            __v: 0
        })
        const blogs = [blog1, blog2, blog3]

        const result = listHelper.favoriteBlog(blogs)
        expect(result === blogs[0] || result === blogs[2]).toBeTruthy()
    })
})

describe('most blogs', () => {
    test('most blogs is right when blogs is empty', () => {
    
        const blogs = []
    
        const result = listHelper.mostBlogs(blogs)
        expect(result).toBe('no blogs')
    })

    test('most blogs is right when only one blog', () => {
        const blogs= [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: "hyvä blogi",
                author: "hyvä bloggari",
                url: "abc",
                likes: 2,
                __v: 0
            }
        ]    
        
        const res = {
            author: blogs[0].author,
            amount: 1
        }
    
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(res)
    })

    test('most blogs is right when equal amount of blogs', () => {
        
        const blog1 = new Blog({
            _id: '5a422aa71b54a676234d17f8',
            title: "hyvä blogi",
            author: "hyvä bloggari",
            url: "abc",
            likes: 1,
            __v: 0
        })    
        const blog2 = new Blog({
            _id: 'AFLm5ukezJOD4RagAVdtV2GhhjA',
            title: "paha blogi",
            author: "paha bloggari",
            url: "efg",
            likes: 2,
            __v: 0
        })
        const blogs = [blog1, blog2]

        const result = listHelper.mostBlogs(blogs)
        const res1 = [blog1.author, 1]
        const res2 = [blog2.author, 1]
        expect(result === res1 || result === res2)
    })

    test('most blogs is right when many blogs', () => {
        
        const blog1 = new Blog({
            _id: '5a422aa71b54a676234d17f8',
            title: "hyvä blogi",
            author: "hyvä bloggari",
            url: "abc",
            likes: 4,
            __v: 0
        })    
        const blog2 = new Blog({
            _id: '5e093ad95bc21a0967f98f7f',
            title: "joku blogi",
            author: "paha bloggari",
            url: "aij",
            likes: 2,
            __v: 0
        })
        const blog3 = new Blog({
            _id: 'AFLm5ukezJOD4RagAVdtV2GhhjA',
            title: "paha blogi",
            author: "paha bloggari",
            url: "efg",
            likes: 4,
            __v: 0
        })
        const blogs = [blog1, blog2, blog3]
        res1 = {
            author: blogs[2].author, 
            amount: 2
        }

        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(res1)
    })
})

describe('most likes', () => {
    test('most likes is right when blogs is empty', () => {
    
        const blogs = []
    
        const result = listHelper.mostLikes(blogs)
        res = {
            author: '',
            likes: 0
        }
        expect(result).toEqual(res)
    })

    test('most likes is right when only one blog', () => {
        const blogs= [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: "hyvä blogi",
                author: "hyvä bloggari",
                url: "abc",
                likes: 2,
                __v: 0
            }
        ]    
        
        const res = {
            author: blogs[0].author,
            likes: 2
        }
    
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(res)
    })

    test('most likes is right when equal amount of blogs', () => {
        
        const blog1 = new Blog({
            _id: '5a422aa71b54a676234d17f8',
            title: "hyvä blogi",
            author: "hyvä bloggari",
            url: "abc",
            likes: 2,
            __v: 0
        })    
        const blog2 = new Blog({
            _id: 'AFLm5ukezJOD4RagAVdtV2GhhjA',
            title: "paha blogi",
            author: "paha bloggari",
            url: "efg",
            likes: 2,
            __v: 0
        })
        const blogs = [blog1, blog2]

        const result = listHelper.mostLikes(blogs)
        const res1 = [blog1.author, 2]
        const res2 = [blog2.author, 2]
        expect(result === res1 || result === res2)
    })

    test('most likes is right when many blogs', () => {
        
        const blog1 = new Blog({
            _id: '5a422aa71b54a676234d17f8',
            title: "hyvä blogi",
            author: "hyvä bloggari",
            url: "abc",
            likes: 4,
            __v: 0
        })    
        const blog2 = new Blog({
            _id: '5e093ad95bc21a0967f98f7f',
            title: "joku blogi",
            author: "paha bloggari",
            url: "aij",
            likes: 2,
            __v: 0
        })
        const blog3 = new Blog({
            _id: 'AFLm5ukezJOD4RagAVdtV2GhhjA',
            title: "paha blogi",
            author: "paha bloggari",
            url: "efg",
            likes: 4,
            __v: 0
        })
        const blogs = [blog1, blog2, blog3]
        res1 = {
            author: blogs[2].author, 
            likes: 6
        }

        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(res1)
    })
})