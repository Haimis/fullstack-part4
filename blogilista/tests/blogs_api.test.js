const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'eka blogi',
        author: 'bloggari1',
        url: 'url1',
        likes: 1
    },
    {
        title: 'toka blogi',
        author: 'toka bloggari',
        url: '2blogi',
        likes: 5
    },
    {
        title: 'ekan bloggarin blogi',
        author: 'bloggari1',
        url: 'ekaurl1',
        likes: 0
    },
    {
        title: 'ploki',
        author: 'timppa',
        url: 'plokinosoite',
        likes: 1
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('4.8', () => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('blogs amount is right', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
      })

})

describe('4.9', () => {
    test('primary key is id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('4.10', () => {
    test('post is added', async () => {
        const blog = {
            title: 'testblog',
            author: 'bloggisti',
            url: 'bloggistinblogi',
            likes: 11
        }
        let blogObject = new Blog(blog)
        await blogObject.save()

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length+1)
        expect(response.body[response.body.length-1].title).toBe('testblog')
    })
})

describe('4.11', () => {
    test('likes are 0 by default', async () => {
        const blog = {
            title: 'testblog',
            author: 'bloggisti',
            url: 'bloggistinblogi'
        }
        let blogObject = new Blog(blog)
        await blogObject.save()
        
        const response = await api.get('/api/blogs')
        expect(response.body[response.body.length-1].likes).toBe(0)
        
    })
})

describe('4.12', () => {
    test('need title and url', async () => {
        const newBlog = {
            author: 'bloggisti',
            likes: 2
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})