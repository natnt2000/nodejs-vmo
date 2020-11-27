const express = require('express')
const router = express.Router()
const { createValidation } = require('../validation')
const User = require('../models/User')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { error } = createValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = new User({ ...req.body })
    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch (error) {
        console.log(error)
    }

})

router.put('/:id', (req, res) => {
    res.send(`Update users ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    res.send(`Delete users ${req.params.id}`)
})

module.exports = router