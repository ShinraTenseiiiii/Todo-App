const mongoose = require('mongoose')

mongoose.connect('') 
// Mongodb connection string
const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', TodoSchema)

module.exports = {
    todo
}