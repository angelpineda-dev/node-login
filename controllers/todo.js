const { request, response } = require('express');
const Todo = require('../models/todo');

const index = async (req, res) => {
    try {
        const todos = await Todo.find({status: true});

        res.json({
            status: true,
            todos
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            error
        })
    }
}

const create = async (req, res) => {
    const { description } = req.body;

    try {

        const newTodo = new Todo({
            description
        });

        await newTodo.save();

        res.json({
            status: true,
            msg: "Todo created"
        })
    } catch (error) {
        
        res.json({
            status:false,
            error
        })
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { description, completed } = req.body;
    
    
    try {
        const todo = await Todo.findById(id);

        if (!todo || !todo.status) {
            return res.status(404).json({
                status:false,
                message: 'Todo not found'
            })
        }

        todo.description = description;
        todo.completed = completed;

        await todo.save();

        res.json({
            status: true,
            todo
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            {status: false},
            {new:true, runValidators:true}
        )

        if (!todo) {
            res.status(404).json({
                status: false,
                msg: "Not found"
            })
        }

        res.json({
            status:true,
            todo
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            error
        })
    }
}

module.exports = {
    index,
    create,
    update,
    remove
}