const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const user = {
        username: 'kayttaja',
        name: 'Keijo',
        password: '12345'
    }

    let newUser = new User(user)
    await newUser.save()

    
})

describe('4.16, new user is valid', () => {
    test('username less than 3 chars rejected', async () => {
        const newUser = {
            username: 'u',
            name: 'Kalle',
            password: 'passu'
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        expect(response.text).toContain('username and password must be at leat 3 chars')
        
    })

    test('password less than 3 chars rejected', async () => {
        const newUser = {
            username: 'kayttaja',
            name: 'Kalle',
            password: '1'
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        expect(response.text).toContain('username and password must be at leat 3 chars')
        
    })

    test('reject ununique usernames', async () => {
        const newUser = {
            username: 'kayttaja',
            name: 'Kari',
            password: 'salasana'
        }

        const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        expect(response.text).toContain('expected `username` to be unique')


    })
})

afterAll(() => {
    mongoose.connection.close()
})