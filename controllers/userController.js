import User from '../models/User.js'
import { createValidation } from '../validation.js'
import Ajv from 'ajv'
import newUserSchema from '../json/newUser.json'
/*
import redis from 'redis'
const client = redis.createClient()
*/

const getAll = async (req, res) => {
    try {
        const users = await User.find()
        // client.setex('getAll', 3600, JSON.stringify(users))
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

/*
const getAllCache = (req, res) => {
    client.get('getAll', (err, result) => {
        if (err) return res.status(500).send('Server error')

        if (result) return res.json(JSON.parse(result))

        return getAll(req, res)
    })
}
*/

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const store = async (req, res) => {
    /*
    const { error } = createValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    */
    const ajv = new Ajv({ allErrors: true });
    const valid = ajv.validate(newUserSchema, req.body)
    
    if (!valid) return res.status(400).send(ajv.errors)

    const user = new User({ ...req.body })

    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch (error) {
        res.status(400).send(error)
    }
}


const update = async (req, res) => {
    const { error } = createValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    try {
        const updateUser = await User.updateOne(
            { _id: req.params.id },
            {
                $set: { ...req.body }
            }
        )

        res.json(updateUser)
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req, res) => {
    try {
        const deleteUser = await User.deleteOne({ _id: req.params.id })
        res.json(deleteUser)
    } catch (error) {
        res.json(error)
    }
}

export { getAll, getById, store, update, remove }