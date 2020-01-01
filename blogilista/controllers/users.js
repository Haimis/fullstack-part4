const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (body.username.length < 3 || body.password.length < 3 ) {
         response.status(400).send({ error: 'username and password must be at leat 3 chars' })
    } else {
        try {

            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash
            })

            const savedUser = await user.save()

            response.json(savedUser)
        } catch (exception) {
            next(exception)
        }
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter