const express = require('express')
const {createTodo,updateTodo} = require('./types')
const cors = require('cors')
const { todo } = require('./db')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.post('/todo' ,  async function (req,res){
 const createPayload= req.body;
 const parsePayload = createTodo.safeParse(createPayload)

if (!parsePayload.success) {
       res.status(411).json({
        msg : "Wrong inputs"
    })
return;
}
await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
})
res.json({
    msg : 'Todo added'
})
})


app.get('/todos', async function (req,res){
 const todos = await todo.find({});
 res.json({
    todos
 })
})


app.put('/completed', async function (req,res){
 const updatePayload = req.body;
 const parsePayload = updateTodo.safeParse(updatePayload)
 if (!parsePayload.success) {
      res.status(404).json({
        msg : "Todo not found"
    })
 return; 
}
await todo.updateOne({
    _id: req.body.id },
   {completed: true}
    )
    res.json({
        msg: 'Marked as done'
    })
})

app.listen(port)