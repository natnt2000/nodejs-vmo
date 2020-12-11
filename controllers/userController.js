import User from '../models/User.js'
import { createValidation } from '../validation.js'

const getAll = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}


const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const store = async (req, res) => {
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

export {getAll, getById, store, update, remove}