const { todo } = require("../models/Todos");

const todoController = {
    getAll: (req, res) => {
        todo.find({ isDeleted: false }, function (err, docs) {
            if (!err) {
                res.json(docs)
            }
            else {
                res.status(500).json(err);
            }
        }
        )
    },
    add: (req, res) => {
        let newTodo = new todo({
            text: req.body.text,
            isCompleted: false,
            isDeleted: false,
            date: req.body.date,
        })

        newTodo.save(function (err, doc) {
            if (!err) {
                res.json(doc)
            }
            else {
                res.status(500).json(err)
            }
        })
    },
    getById: (req, res) => {
        let id = req.params.id;
        todo.findById(id, (err, doc) => {
            if (!err) {
                res.json(doc)
            } else {
                res.status(500).json(err);
            }
        })
    },
    delete: (req, res) => {
        let id = req.params.id;
        todo.findByIdAndDelete(id, (err, doc) => {
            if (!err) {
                res.json(doc)
            } else {
                res.status(500).json(err);
            }
        })
    },
    update: (req, res) => {
        let id = req.params.id;
        let updatedTodo = new todo({
            _id: id,
            text: req.body.text,
            isDeleted:req.body.isDeleted,
            isCompleted:req.body.isCompleted
        })
        todo.findByIdAndUpdate(id, updatedTodo, { new: true }, (err, doc) => {
            if (!err) {
                res.json(doc)
            } else {
                res.status(500).json(err);
            }
        })
    }
}

module.exports = {
    todoController
}