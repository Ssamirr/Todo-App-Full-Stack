const { default: mongoose } = require("mongoose")
const { Schema } = mongoose

const todoSchema = Schema({
    text: String,
    isCompleted: Boolean,
    isDeleted: Boolean,
    date: {
        type: Date,
        default: Date()
    }
})

const todo = mongoose.model('Todo', todoSchema)

module.exports = {
    todo,
}